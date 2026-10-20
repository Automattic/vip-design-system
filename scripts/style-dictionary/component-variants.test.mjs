// @vitest-environment node
import { describe, expect, it } from 'vitest';
import StyleDictionary from 'style-dictionary';
import postcss from 'postcss';
import {
	loadComponentVariants,
	resolveComponentVariants,
	componentVariantsCSS,
	componentVariantsReference,
} from './component-variants.mjs';

const components = await loadComponentVariants();
const sd = new StyleDictionary({
	usesDtcg: true,
	source: [
		'tokens/primitives/**/*.json',
		'tokens/semantic/**/*.json',
		'tokens/component/badge.json',
	],
	platforms: { css: { transforms: ['name/kebab'] } },
});
const dictionary = await sd.getPlatformTokens('css');
const resolve = (definitions = components, tokens = dictionary) =>
	resolveComponentVariants(definitions, tokens);

describe('component variants', () => {
	it('exposes only explicitly marked components and their declared variants', () => {
		expect(Object.keys(components)).toEqual(['badge']);
		const changed = structuredClone(dictionary);
		changed.allTokens.push({ path: ['badge', 'private', 'unused'], $type: 'color', $value: 'red' });
		expect(Object.keys(resolve(components, changed).badge.variants)).toEqual([
			'gray',
			'blue',
			'green',
			'red',
			'gold',
			'yellow',
		]);
		expect(resolve().badge.default).toBe('gray');
	});
	it('generates local defaults and variable-only variants, with light fallbacks', () => {
		const root = postcss.parse(componentVariantsCSS('badge', resolve().badge));
		const selectors = new Set();
		root.walkRules((rule) => {
			rule.selectors.forEach((selector) => selectors.add(selector));
			expect(rule.nodes.map((node) => node.prop).sort()).toEqual([
				'--badge-background',
				'--badge-border-color',
				'--badge-color',
			]);
			rule.walkDecls((decl) => {
				expect(decl.value).toContain('var(--color-');
				if (rule.parent.type !== 'atrule' || rule.parent.name !== 'supports')
					expect(decl.value).not.toContain('light-dark(');
			});
		});
		expect([...selectors]).toEqual([
			'.badge',
			...[
				'gray',
				'system',
				'blue',
				'info',
				'green',
				'success',
				'red',
				'error',
				'gold',
				'brand',
				'yellow',
				'warning',
			].map((value) => `.badge[data-badge-variant='${value}']`),
		]);
	});
	it('shares public names and defaults with the documentation', () => {
		const docs = componentVariantsReference(resolve());
		expect(docs).toContain('data-badge-variant');
		expect(docs).toContain('Default: `gray`');
		for (const option of Object.keys(components.badge.variants))
			expect(docs).toContain(`| \`${option}\` |`);
		for (const [alias, target] of Object.entries(components.badge.aliases))
			expect(docs).toContain(`| \`${alias}\` | \`${target}\` |`);
	});
	it('rejects alias collisions, unsafe names, missing targets, and alias chains', () => {
		for (const aliases of [
			{ blue: 'gray' },
			{ 'info]': 'blue' },
			{ info: 'missing' },
			{ info: 'blue', other: 'info' },
			['info'],
		]) {
			const changed = structuredClone(components);
			changed.badge.aliases = aliases;
			expect(() => resolve(changed)).toThrow(/alias/);
		}
	});
	it('rejects invalid defaults and incomplete variants', () => {
		const changed = structuredClone(components);
		changed.badge.default = 'missing';
		expect(() => resolve(changed)).toThrow('default must name');
		changed.badge.default = 'gray';
		delete changed.badge.variants.blue.color;
		expect(() => resolve(changed)).toThrow('same fields');
	});
	it('rejects unsafe selector names', () => {
		const changed = structuredClone(components);
		changed.badge.variants['blue]'] = changed.badge.variants.blue;
		expect(() => resolve(changed)).toThrow('invalid variant');
	});
	it.each(['$value', 'dark'])(
		'requires semantic color aliases in %s, including dark-only references',
		(field) => {
			for (const value of ['#ffffff', '{color.blue.50}', '{missing.token}', '{space.micro}']) {
				const changed = structuredClone(dictionary);
				const token = changed.allTokens.find(
					(token) => token.path.join('.') === 'badge.variants.blue.background'
				);
				if (field === 'dark') token.original.$extensions.dark = value;
				else token.original.$value = value;
				expect(() => resolve(components, changed)).toThrow('must reference a semantic color token');
			}
		}
	);
	it('preserves transformed semantic names instead of resolved raw colors', () => {
		const changed = structuredClone(dictionary);
		const token = changed.allTokens.find(
			(token) => token.path.join('.') === 'color.support.info.background'
		);
		token.name = 'consumer-info-background';
		expect(resolve(components, changed).badge.variants.blue.background.light).toBe(
			'var(--consumer-info-background)'
		);
	});
});
