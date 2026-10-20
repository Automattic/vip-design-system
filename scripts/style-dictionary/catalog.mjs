import { readFile, readdir } from 'node:fs/promises';

/** Configuration metadata is deliberately loaded separately from token sources. */
export async function loadCatalog() {
	const root = new URL('../../tokens/configuration/', import.meta.url);
	const readJSON = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));
	const optionSets = await readJSON('option-sets.json');
	const classes = {};
	for (const layer of ['compositions', 'utilities']) {
		for (const file of (await readdir(new URL(`${layer}/`, root))).sort()) {
			if (!file.endsWith('.json')) continue;
			const name = file.slice(0, -5);
			const entry = await readJSON(`${layer}/${file}`);
			if (entry.layer !== layer) throw new Error(`${file}: layer must be ${layer}`);
			if (Object.hasOwn(classes, name)) throw new Error(`Duplicate configuration: ${name}`);
			classes[name] = entry;
		}
	}
	return { optionSets, classes };
}

/** Resolve the public API against transformed tokens without resolving away CSS variables. */
export function resolveCatalog(catalog, dictionary) {
	const fail = (context, message) => {
		throw new Error(`${context}: ${message}`);
	};
	const tokens = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));
	const sets = {};
	const expand = (name, ancestors = []) => {
		if (ancestors.includes(name)) fail(name, 'circular option-set inheritance');
		if (Object.hasOwn(sets, name)) return sets[name];
		const set = catalog.optionSets[name];
		if (!set) fail(name, 'unknown option set');
		const values = {};
		for (const parent of set.extends ?? []) {
			const inherited = expand(parent, [...ancestors, name]);
			if (set.type !== inherited.type) fail(name, `incompatible option-set type: ${parent}`);
			Object.assign(values, inherited.values);
		}
		for (const [option, value] of Object.entries(set.values ?? {})) {
			if (Object.hasOwn(values, option)) fail(name, `duplicate inherited option: ${option}`);
			if (!/^[a-z0-9][a-z0-9./%-]*$/.test(option)) fail(name, `invalid option name: ${option}`);
			values[option] = value;
		}
		if (!Object.keys(values).length) fail(name, 'empty option set');
		sets[name] = { type: set.type, values };
		return sets[name];
	};
	for (const name of Object.keys(catalog.optionSets)) expand(name);

	const resolveValue = (value, type, context, local) => {
		const kinds = ['token', 'literal', 'template'].filter((key) => Object.hasOwn(value, key));
		if (kinds.length !== 1 || Object.keys(value).length !== 1)
			fail(context, 'expected one token, literal, or template');
		const kind = kinds[0];
		if (typeof value[kind] !== 'string' || !value[kind])
			fail(context, 'expected a nonempty string');
		if (kind === 'token') {
			const token = tokens.get(value.token);
			if (!token) fail(context, `unknown token: ${value.token}`);
			if (token.$type !== type)
				fail(context, `expected ${type} token; ${value.token} is ${token.$type}`);
			if (local && token.filePath?.includes('tokens/component/') && token.path[0] !== local.name)
				fail(context, `component token ${value.token} is scoped to .${token.path[0]}`);
			return `var(--${token.name})`;
		}
		if (kind === 'literal') {
			if (/[{};]/.test(value.literal) || /var\s*\(/i.test(value.literal))
				fail(context, 'use token references or setting templates instead of literal CSS variables');
			return value.literal;
		}
		// Templates reference local settings, never guessed CSS variable names.
		if (/;|var\s*\(/i.test(value.template)) fail(context, 'invalid setting template');
		return value.template.replace(/\{([^{}]+)\}/g, (_, reference) => {
			if (!local) return `{${reference}}`; // Shared reference docs retain the local placeholder.
			const source = local.settings[reference];
			if (!source) fail(context, `unknown setting: ${reference}`);
			if (reference === local.key) fail(context, 'setting cannot reference itself');
			if (source.type !== type || source.target !== local.target)
				fail(context, `incompatible setting: ${reference}`);
			return `var(--${local.name}-${reference})`;
		});
	};

	const optionSets = Object.fromEntries(
		Object.entries(sets).map(([name, set]) => [
			name,
			Object.fromEntries(
				Object.entries(set.values).map(([option, value]) => [
					option,
					resolveValue(value, set.type, `${name}.${option}`),
				])
			),
		])
	);
	const classes = {};
	for (const [name, entry] of Object.entries(catalog.classes)) {
		if (!/^[a-z][a-z-]*$/.test(name)) fail(name, 'invalid class name');
		if (!['compositions', 'utilities'].includes(entry.layer)) fail(name, 'invalid layer');
		const settings = {};
		for (const [key, setting] of Object.entries(entry.settings)) {
			const context = `${name}.${key}`;
			if (!/^[a-z][a-z-]*$/.test(key)) fail(context, 'invalid setting name');
			if (!['self', 'children'].includes(setting.target)) fail(context, 'invalid target');
			const set = sets[setting.options];
			if (!set) fail(context, `unknown option set: ${setting.options}`);
			if (setting.type !== set.type)
				fail(context, `expected ${setting.type} option set, received ${set.type}`);
			if (typeof setting.default !== 'string' || !Object.hasOwn(set.values, setting.default))
				fail(context, `default is not an allowed option: ${setting.default}`);
			const values = Object.fromEntries(
				Object.entries(set.values).map(([option, value]) => [
					option,
					resolveValue(value, setting.type, `${context}.${option}`, {
						name,
						key,
						settings: entry.settings,
						target: setting.target,
					}),
				])
			);
			settings[key] = { ...setting, values, defaultValue: values[setting.default] };
		}
		const presets = {};
		for (const [key, preset] of Object.entries(entry.presets ?? {})) {
			if (!/^[a-z][a-z-]*$/.test(key) || Object.hasOwn(settings, key))
				fail(name, `invalid preset name: ${key}`);
			const options = {};
			for (const [option, assignments] of Object.entries(preset.options)) {
				if (!/^[a-z][a-z0-9-]*$/.test(option)) fail(name, `invalid preset option: ${option}`);
				options[option] = {};
				for (const [property, value] of Object.entries(assignments)) {
					const context = `${name}.${key}.${option}.${property}`;
					const setting = settings[property];
					if (!setting || setting.target !== 'self')
						fail(context, 'presets must assign container settings');
					if (Object.keys(value).length !== 1) fail(context, 'expected one option or setting');
					if (Object.hasOwn(value, 'option')) {
						if (!Object.hasOwn(setting.values, value.option))
							fail(context, `unknown option: ${value.option}`);
						options[option][property] = setting.values[value.option];
					} else if (Object.hasOwn(value, 'setting')) {
						const source = settings[value.setting];
						if (
							!source ||
							source.type !== setting.type ||
							source.target !== setting.target ||
							value.setting === property
						)
							fail(context, `incompatible setting: ${value.setting}`);
						options[option][property] = `var(--${name}-${value.setting})`;
					} else fail(context, 'expected option or setting');
				}
			}
			for (const alias of preset.aliases ?? []) {
				if (
					!/^data-[a-z-]+$/.test(alias.attribute) ||
					!/^[a-z0-9-]+$/.test(alias.value) ||
					!Object.hasOwn(options, alias.option)
				)
					fail(name, 'invalid preset alias');
			}
			presets[key] = { ...preset, options };
		}
		classes[name] = { ...entry, settings, presets };
	}
	return { optionSets, classes };
}
