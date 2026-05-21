import StyleDictionary from 'style-dictionary';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get the dark-theme $value from a token's $extensions.dark field */
function getDarkRaw(token) {
	return token.original.$extensions?.dark ?? null;
}

/** Convert {path.to.token} references to CSS var(--path-to-token) */
function refToVar(str) {
	return typeof str === 'string'
		? str.replace(/\{([^}]+)\}/g, (_, p) => `var(--${p.replace(/\./g, '-')})`)
		: String(str ?? '');
}

/** Format a DTCG shadow $value (array of layers) as a CSS box-shadow string */
function formatShadow(layers) {
	return (Array.isArray(layers) ? layers : [layers])
		.map(({ offsetX, offsetY, blur, spread, color }) =>
			[offsetX || '0', offsetY || '0', blur || '0', spread || '0', color].join(' ')
		)
		.join(', ');
}

/**
 * Get the CSS-ready value for a token.
 * - useRefs=false → resolved raw value (token.$value), for primitives
 * - useRefs=true  → original reference converted to var(), for semantic/component tokens
 */
function tokenDisplayValue(token, useRefs = false) {
	const raw = useRefs ? token.original.$value : token.$value;
	if (token.$type === 'shadow') return formatShadow(raw);
	if (useRefs && typeof raw === 'string') return refToVar(raw);
	return String(raw ?? '');
}

// ─── Custom formats ───────────────────────────────────────────────────────────

/** Primitive tokens as plain CSS vars on :root */
StyleDictionary.registerFormat({
	name: 'css/primitives',
	format: ({ dictionary }) => {
		const lines = dictionary.allTokens.map((t) => `\t--${t.name}: ${tokenDisplayValue(t, false)};`);
		return `/* Auto-generated — do not edit. Run \`npm run build:tokens\` to update. */\n:root {\n${lines.join('\n')}\n}\n`;
	},
});

/** Semantic tokens as CSS vars with light-dark() and @supports fallback */
StyleDictionary.registerFormat({
	name: 'css/semantic-light-dark',
	format: ({ dictionary }) => {
		const fallback = [];
		const supported = [];

		for (const t of dictionary.allTokens) {
			const name = `--${t.name}`;
			const lightVal = tokenDisplayValue(t, true);
			fallback.push(`\t${name}: ${lightVal};`);

			const darkRaw = getDarkRaw(t);
			if (darkRaw && t.$type === 'color') {
				const darkVal = refToVar(darkRaw);
				supported.push(`\t\t${name}: light-dark(${lightVal}, ${darkVal});`);
			} else {
				supported.push(`\t\t${name}: ${lightVal};`);
			}
		}

		return [
			'/* Auto-generated — do not edit. Run `npm run build:tokens` to update. */',
			':root {',
			...fallback,
			'}',
			'',
			'@supports (color: light-dark(red, blue)) {',
			'\t:root {',
			'\t\tcolor-scheme: light dark;',
			...supported,
			'\t}',
			'\t:root.theme-dark { color-scheme: dark; }',
			'\t:root.theme-light { color-scheme: light; }',
			'}',
			'',
		].join('\n');
	},
});

/** Typography utility classes (.type-heading-1, .type-body-default, etc.) */
StyleDictionary.registerFormat({
	name: 'css/typography-classes',
	format: ({ dictionary }) => {
		const classes = dictionary.allTokens
			.filter((t) => t.$type === 'typography')
			.map((t) => {
				const cls = '.type-' + t.path.join('-');
				// SD v4 leaves token.value undefined for composite types;
				// original.$value has the unresolved references we convert to var()
				const v = t.original.$value;
				const props = [
					v.fontFamily && `\tfont-family: ${refToVar(v.fontFamily)};`,
					v.fontWeight !== undefined && `\tfont-weight: ${refToVar(String(v.fontWeight))};`,
					v.fontSize && `\tfont-size: ${refToVar(v.fontSize)};`,
					v.lineHeight !== undefined && `\tline-height: ${refToVar(String(v.lineHeight))};`,
					v.letterSpacing && `\tletter-spacing: ${refToVar(v.letterSpacing)};`,
					v.textTransform && `\ttext-transform: ${v.textTransform};`,
				].filter(Boolean);
				return `${cls} {\n${props.join('\n')}\n}`;
			});
		return (
			'/* Auto-generated — do not edit. Run `npm run build:tokens` to update. */\n' +
			classes.join('\n\n') +
			'\n'
		);
	},
});

/** Component tokens scoped to a CSS selector, with light-dark() for themed tokens */
StyleDictionary.registerFormat({
	name: 'css/component-vars',
	format: ({ dictionary, options }) => {
		const selector = options?.selector ?? '.component';
		const fallback = [];
		const supported = [];
		let hasDark = false;

		for (const t of dictionary.allTokens) {
			const name = `--${t.name}`;
			const lightVal = tokenDisplayValue(t, true);
			fallback.push(`\t${name}: ${lightVal};`);

			const darkRaw = getDarkRaw(t);
			if (darkRaw && t.$type === 'color') {
				supported.push(`\t\t${name}: light-dark(${lightVal}, ${refToVar(darkRaw)});`);
				hasDark = true;
			} else {
				supported.push(`\t\t${name}: ${lightVal};`);
			}
		}

		const out = [
			`/* Auto-generated — do not edit. Run \`npm run build:tokens\` to update. */`,
			`${selector} {`,
			...fallback,
			`}`,
		];

		if (hasDark) {
			out.push(
				``,
				`@supports (color: light-dark(red, blue)) {`,
				`\t${selector} {`,
				...supported,
				`\t}`,
				`}`
			);
		}

		out.push(``);
		return out.join('\n');
	},
});

/** TypeScript map of token path → CSS var name */
StyleDictionary.registerFormat({
	name: 'typescript/token-names',
	format: ({ dictionary }) => {
		const entries = dictionary.allTokens
			.filter((t) => t.$type !== 'typography')
			.map((t) => `\t'${t.path.join('.')}': 'var(--${t.name})'`);
		return [
			'// Auto-generated — do not edit. Run `npm run build:tokens` to update.',
			'export const tokens = {',
			entries.join(',\n'),
			'} as const;',
			'',
			'export type TokenName = keyof typeof tokens;',
			'export type TokenVar = (typeof tokens)[TokenName];',
			'',
		].join('\n');
	},
});

/** TypeScript breakpoints map */
StyleDictionary.registerFormat({
	name: 'typescript/breakpoints',
	format: ({ dictionary }) => {
		const entries = dictionary.allTokens.map((t) => `\t${t.path.at(-1)}: ${t.$value}`);
		return [
			'// Auto-generated — do not edit. Run `npm run build:tokens` to update.',
			'export const breakpoints = {',
			entries.join(',\n'),
			'} as const;',
			'',
			'export type BreakpointName = keyof typeof breakpoints;',
			'',
		].join('\n');
	},
});

// ─── Shared config ────────────────────────────────────────────────────────────

const sdOpts = { usesDtcg: true, log: { verbosity: 'default' } };
const nameTransform = ['name/kebab'];

// ─── Build 1: Primitive CSS vars ─────────────────────────────────────────────

await new StyleDictionary(
	{
		source: [
			'tokens/primitives/color.json',
			'tokens/primitives/space.json',
			'tokens/primitives/font-size.json',
			'tokens/primitives/font-weight.json',
			'tokens/primitives/line-height.json',
			'tokens/primitives/letter-spacing.json',
			'tokens/primitives/border-radius.json',
			'tokens/primitives/shadow.json',
			'tokens/primitives/font-family.json',
			'tokens/primitives/breakpoint.json',
		],
		platforms: {
			css: {
				transforms: nameTransform,
				files: [
					{
						destination: 'src/css/generated/primitives.css',
						format: 'css/primitives',
						filter: (t) => !t.filePath?.includes('breakpoint'),
					},
				],
			},
		},
	},
	sdOpts
).buildAllPlatforms();

// ─── Build 2: Semantic CSS vars with light-dark() ─────────────────────────────

await new StyleDictionary(
	{
		source: ['tokens/primitives/**/*.json', 'tokens/semantic/**/*.json'],
		platforms: {
			css: {
				transforms: nameTransform,
				files: [
					{
						destination: 'src/css/generated/semantic.css',
						format: 'css/semantic-light-dark',
						filter: (t) => t.filePath?.includes('semantic/') && t.$type !== 'typography',
						options: { outputReferences: true },
					},
				],
			},
		},
	},
	sdOpts
).buildAllPlatforms();

// ─── Build 3: Typography utility classes ─────────────────────────────────────

await new StyleDictionary(
	{
		source: ['tokens/primitives/**/*.json', 'tokens/semantic/typography.json'],
		platforms: {
			css: {
				transforms: nameTransform,
				files: [
					{
						destination: 'src/css/generated/typography.css',
						format: 'css/typography-classes',
						filter: (t) => t.$type === 'typography',
						options: { outputReferences: true },
					},
				],
			},
		},
	},
	sdOpts
).buildAllPlatforms();

// ─── Build 4: Component CSS vars ─────────────────────────────────────────────

const components = [
	{ name: 'button', selector: '.button' },
	{ name: 'input', selector: '.input' },
	{ name: 'tag', selector: '.tag' },
	{ name: 'sticker', selector: '.sticker' },
	{ name: 'support', selector: '.support' },
	{ name: 'toolbar', selector: '.toolbar' },
	{ name: 'logs', selector: '.logs' },
	{ name: 'option-row', selector: '.option-row' },
	{ name: 'slider', selector: '.slider' },
];

for (const { name, selector } of components) {
	// Support either a single flat file or a subdirectory of split files
	const compSource = [`tokens/component/${name}.json`, `tokens/component/${name}/**/*.json`];
	const compFilter = (t) => t.filePath?.includes(`component/${name}`);

	await new StyleDictionary(
		{
			source: ['tokens/primitives/**/*.json', 'tokens/semantic/**/*.json', ...compSource],
			platforms: {
				css: {
					transforms: nameTransform,
					files: [
						{
							destination: `src/css/generated/components/${name}.css`,
							format: 'css/component-vars',
							filter: compFilter,
							options: { outputReferences: true, selector },
						},
					],
				},
			},
		},
		sdOpts
	).buildAllPlatforms();
}

// ─── Build 5: TypeScript token map ───────────────────────────────────────────

await new StyleDictionary(
	{
		source: ['tokens/primitives/**/*.json', 'tokens/semantic/**/*.json'],
		platforms: {
			ts: {
				transforms: nameTransform,
				files: [
					{
						destination: 'src/tokens/index.ts',
						format: 'typescript/token-names',
						filter: (t) => t.$type !== 'typography',
					},
					{
						destination: 'src/tokens/breakpoints.ts',
						format: 'typescript/breakpoints',
						filter: (t) => t.filePath?.includes('breakpoint'),
					},
				],
			},
		},
	},
	sdOpts
).buildAllPlatforms();

console.log('\n✅ Token build complete');
