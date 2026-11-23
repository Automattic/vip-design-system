import { readFile, readdir } from 'node:fs/promises';

const extension = 'com.automattic.vip.css';
const identifier = /^[a-z][a-z0-9-]*$/;

/** Only an explicitly marked variants group exposes component tokens as attributes. */
export async function loadComponentVariants() {
	const root = new URL('../../tokens/component/', import.meta.url);
	const components = {};
	for (const file of (await readdir(root)).sort()) {
		if (!file.endsWith('.json')) continue;
		const source = JSON.parse(await readFile(new URL(file, root), 'utf8'));
		for (const [name, component] of Object.entries(source)) {
			const group = component.variants;
			const metadata = group?.$extensions?.[extension];
			if (!metadata) continue;
			if (!identifier.test(name) || name !== file.slice(0, -5))
				throw new Error(`${file}: variant component must match its filename`);
			components[name] = {
				default: metadata.default,
				aliases: metadata.aliases ?? {},
				react: group.$extensions['com.automattic.vip.react'],
				variants: Object.fromEntries(Object.entries(group).filter(([key]) => !key.startsWith('$'))),
			};
		}
	}
	return components;
}

/** Keep semantic aliases and public names available for CSS, docs, and future types. */
export function resolveComponentVariants(components, dictionary) {
	const tokens = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));
	const resolved = {};
	for (const [name, component] of Object.entries(components)) {
		const fail = (message) => {
			throw new Error(`${name} variants: ${message}`);
		};
		if (!identifier.test(name)) fail('invalid component name');
		if (
			typeof component.default !== 'string' ||
			!Object.hasOwn(component.variants, component.default)
		)
			fail('default must name a declared variant');
		const fields = Object.keys(component.variants[component.default]).sort();
		if (!fields.length || fields.some((field) => !identifier.test(field))) fail('invalid fields');
		const reference = (value, context) => {
			const match = typeof value === 'string' && value.match(/^\{([^}]+)\}$/);
			const token = match && tokens.get(match[1]);
			if (!token || !token.filePath?.includes('tokens/semantic/') || token.$type !== 'color')
				fail(`${context} must reference a semantic color token`);
			return `var(--${token.name})`;
		};
		const variants = {};
		for (const [option, values] of Object.entries(component.variants)) {
			if (!identifier.test(option)) fail(`invalid variant: ${option}`);
			if (Object.keys(values).sort().join(',') !== fields.join(','))
				fail(`${option} must configure the same fields as the default`);
			variants[option] = {};
			for (const field of fields) {
				const token = tokens.get(`${name}.variants.${option}.${field}`);
				if (token?.$type !== 'color') fail(`${option}.${field} must be a color token`);
				const light = reference(token.original.$value, `${option}.${field}`);
				const darkRaw = token.original.$extensions?.dark;
				const dark = darkRaw === undefined ? light : reference(darkRaw, `${option}.${field}.dark`);
				variants[option][field] = { light, dark };
			}
		}
		const aliases = component.aliases ?? {};
		if (typeof aliases !== 'object' || aliases === null || Array.isArray(aliases))
			fail('aliases must map names to declared variants');
		for (const [alias, target] of Object.entries(aliases)) {
			if (!identifier.test(alias) || Object.hasOwn(variants, alias))
				fail(`invalid or conflicting alias: ${alias}`);
			if (typeof target !== 'string' || !Object.hasOwn(variants, target))
				fail(`${alias} must alias a declared variant`);
		}
		resolved[name] = { default: component.default, variants, aliases, react: component.react };
	}
	return resolved;
}

export function componentVariantsCSS(name, component) {
	const rules = (themed) =>
		[
			[`.${name}`, component.variants[component.default]],
			...Object.entries(component.variants).map(([option, values]) => [
				[
					option,
					...Object.keys(component.aliases).filter((alias) => component.aliases[alias] === option),
				]
					.map((value) => `.${name}[data-${name}-variant='${value}']`)
					.join(',\n'),
				values,
			]),
		]
			.map(
				([selector, values]) =>
					`${selector} {\n${Object.entries(values)
						.map(
							([field, { light, dark }]) =>
								`--${name}-${field}: ${themed && light !== dark ? `light-dark(${light}, ${dark})` : light};`
						)
						.join('\n')}\n}`
			)
			.join('\n\n');
	return `/* Generated from tokens/component/${name}.json by Style Dictionary. Do not edit. */
@layer blocks {
${rules(false)}
@supports (color: light-dark(red, blue)) {
${rules(true)}
}
}
`;
}

export function componentVariantsReference(components) {
	return Object.entries(components)
		.map(([name, component]) => {
			const fields = Object.keys(component.variants[component.default]);
			return `## ${name} variants

Use \`data-${name}-variant\`. Default: \`${component.default}\`. Only these named combinations are configurable.
Each cell lists its light / dark semantic references; the selected semantic tokens also respond to the theme.

| Option | ${fields.join(' | ')} |
| --- | ${fields.map(() => '---').join(' | ')} |
${Object.entries(component.variants)
	.map(
		([option, values]) =>
			`| \`${option}\` | ${fields.map((field) => `\`${values[field].light}\` / \`${values[field].dark}\``).join(' | ')} |`
	)
	.join('\n')}

${
	Object.keys(component.aliases).length
		? `Aliases select the same values in both themes:

| Alias | Variant |
| --- | --- |
${Object.entries(component.aliases)
	.map(([alias, target]) => `| \`${alias}\` | \`${target}\` |`)
	.join('\n')}`
		: ''
}`;
		})
		.join('\n\n');
}
