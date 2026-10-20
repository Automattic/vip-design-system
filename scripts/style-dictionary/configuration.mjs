import { readFile } from 'node:fs/promises';
import StyleDictionary from 'style-dictionary';
import { format, resolveConfig } from 'prettier';
import { loadCatalog, resolveCatalog } from './catalog.mjs';
import {
	loadComponentVariants,
	resolveComponentVariants,
	componentVariantsCSS,
	componentVariantsReference,
} from './component-variants.mjs';

const header =
	'Generated from tokens/configuration by Style Dictionary. Do not edit. Run npm run build:tokens.';
const rule = (selector, declarations) =>
	`${selector} {\n${Object.entries(declarations)
		.map(([property, value]) => `--${property}: ${value};`)
		.join('\n')}\n}`;

export function configurationCSS(name, entry) {
	const rules = [];
	for (const target of ['self', 'children']) {
		const defaults = Object.fromEntries(
			Object.entries(entry.settings)
				.filter(([, setting]) => setting.target === target)
				.map(([key, setting]) => [`${name}-${key}`, setting.defaultValue])
		);
		if (Object.keys(defaults).length)
			rules.push(rule(`.${name}${target === 'children' ? ' > *' : ''}`, defaults));
	}
	// Legacy aliases precede explicit presets; individual options follow both.
	for (const [key, preset] of Object.entries(entry.presets)) {
		const declarations = (assignments) =>
			Object.fromEntries(
				Object.entries(assignments).map(([property, value]) => [`${name}-${property}`, value])
			);
		for (const alias of preset.aliases ?? []) {
			rules.push(
				rule(
					`.${name}[${alias.attribute}='${alias.value}']`,
					declarations(preset.options[alias.option])
				)
			);
		}
		for (const [option, assignments] of Object.entries(preset.options)) {
			rules.push(rule(`.${name}[data-${name}-${key}='${option}']`, declarations(assignments)));
		}
	}
	for (const [key, setting] of Object.entries(entry.settings)) {
		for (const [option, value] of Object.entries(setting.values)) {
			rules.push(
				rule(
					`.${name}[data-${name}-${key}='${option}']${setting.target === 'children' ? ' > *' : ''}`,
					{ [`${name}-${key}`]: value }
				)
			);
		}
	}
	return `/* ${header}\n * Local defaults isolate nested instances. Attributes configure variables;\n * property declarations remain in the handwritten companion.\n */\n@layer ${entry.layer} {\n${rules.join('\n\n')}\n}\n`;
}

export function configurationReference(catalog, components = {}) {
	const rows = Object.entries(catalog.classes).flatMap(([name, entry]) =>
		Object.entries(entry.settings).map(
			([key, setting]) =>
				`| \`data-${name}-${key}\` | [${setting.options}](#${setting.options}) | \`${setting.default}\` | \`${setting.defaultValue}\` | ${setting.target === 'children' ? 'Direct children' : 'Container'} |`
		)
	);
	const presets = Object.entries(catalog.classes).flatMap(([name, entry]) =>
		Object.entries(entry.presets).map(([key, preset]) => {
			const assignments = Object.keys(Object.values(preset.options)[0]);
			return `## ${name} ${key}\n\nUse \`data-${name}-${key}\` to select these values together. Individual attributes override the preset.\n\n| Option | ${assignments.join(' | ')} |\n| --- | ${assignments.map(() => '---').join(' | ')} |\n${Object.entries(
				preset.options
			)
				.map(
					([option, values]) =>
						`| \`${option}\` | ${assignments.map((property) => `\`${values[property]}\``).join(' | ')} |`
				)
				.join(
					'\n'
				)}\n\n${(preset.aliases ?? []).map((alias) => `\`${alias.attribute}="${alias.value}"\` remains an alias for \`data-${name}-${key}="${alias.option}"\`. An explicit preset takes precedence.`).join('\n')}`;
		})
	);
	return `<!-- Generated from tokens/configuration and tokens/component by Style Dictionary. Do not edit. Run npm run build:tokens. -->

# Configuration options

See [the configuration guide](./CSS-CONFIGURATION.md) for examples, nesting, and overrides.
Attribute values are exact strings; unlisted values apply no override.

| Attribute | Allowed options | Default option | Default CSS value | Variable location |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

${presets.join('\n\n')}

${componentVariantsReference(components)}

${Object.entries(catalog.optionSets)
	.map(
		([name, options]) =>
			`## ${name}\n\n| Option | CSS value |\n| --- | --- |\n${Object.entries(options)
				.map(([option, value]) => `| \`${option}\` | \`${value}\` |`)
				.join('\n')}`
	)
	.join('\n\n')}

Values containing \`{setting-name}\` are templates expanded to the composition's local CSS variable.
`;
}

async function formatted(content, destination, parser) {
	return format(content, { ...(await resolveConfig(destination)), parser });
}

StyleDictionary.registerFormat({
	name: 'css/configuration',
	format: ({ dictionary, options, file }) => {
		const catalog = resolveCatalog(options.catalog, dictionary);
		return formatted(
			configurationCSS(options.name, catalog.classes[options.name]),
			file.destination,
			'css'
		);
	},
});
StyleDictionary.registerFormat({
	name: 'markdown/configuration',
	format: ({ dictionary, options, file }) =>
		formatted(
			configurationReference(
				resolveCatalog(options.catalog, dictionary),
				resolveComponentVariants(options.components, dictionary)
			),
			file.destination,
			'markdown'
		),
});

StyleDictionary.registerFormat({
	name: 'css/component-variants',
	format: ({ dictionary, options, file }) =>
		formatted(
			componentVariantsCSS(
				options.name,
				resolveComponentVariants(options.components, dictionary)[options.name]
			),
			file.destination,
			'css'
		),
});

/** Used by the token build and its read-only configuration freshness check. */
export async function buildConfiguration({ check = false } = {}) {
	const catalog = await loadCatalog();
	const components = await loadComponentVariants();
	const sd = new StyleDictionary({
		usesDtcg: true,
		source: [
			'tokens/primitives/**/*.json',
			'tokens/semantic/**/*.json',
			...Object.keys(components).map((name) => `tokens/component/${name}.json`),
		],
		platforms: {
			configuration: {
				transforms: ['name/kebab'],
				options: { catalog, components },
				files: [
					...Object.entries(catalog.classes).map(([name, entry]) => ({
						destination: `src/css/${entry.layer}/${name}.config.generated.css`,
						format: 'css/configuration',
						options: { name },
					})),
					...Object.keys(components).map((name) => ({
						destination: `src/css/blocks/${name}.config.generated.css`,
						format: 'css/component-variants',
						options: { name },
					})),
					{ destination: 'docs/CSS-CONFIGURATION-OPTIONS.md', format: 'markdown/configuration' },
				],
			},
		},
	});
	if (check) {
		for (const { output, destination } of await sd.formatPlatform('configuration')) {
			let existing;
			try {
				existing = await readFile(destination, 'utf8');
			} catch (error) {
				if (error.code !== 'ENOENT') throw error;
			}
			if (existing !== output)
				throw new Error(`${destination} is missing or stale; run npm run build:tokens`);
		}
	} else {
		await sd.buildAllPlatforms();
	}
}
