// @vitest-environment node
import { describe, expect, it } from 'vitest';
import StyleDictionary from 'style-dictionary';
import { loadCatalog, resolveCatalog } from './catalog.mjs';
import { loadComponentVariants, resolveComponentVariants } from './component-variants.mjs';
import { reactWrappers } from './react-wrappers.mjs';

const catalog = await loadCatalog();
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
const resolve = (value = catalog) => resolveCatalog(value, dictionary);

describe('React wrapper generation', () => {
	it('derives numeric and semantic unions, preset props and behavior mappings from metadata', () => {
		const source = reactWrappers(resolve(), resolveComponentVariants(components, dictionary));
		expect(source.match(/export const /g)).toHaveLength(15);
		expect(source).toContain('borderWidth?: 0 | 1 | 1.5');
		expect(source).toContain('sticky?: boolean');
		expect(source).toContain("sticky: { attribute: 'data-sticky', presence: true }");
		expect(source).toContain('"success"');
		expect(source).toContain('badge type-support-label-xs');
		expect(source).not.toContain('light-dark');
	});

	it('picks up new allowed values and aliases without editing TypeScript', () => {
		const changed = structuredClone(catalog);
		changed.optionSets.space.values['14'] = { literal: '12rem' };
		const aliases = structuredClone(components);
		aliases.badge.aliases.positive = 'green';
		const source = reactWrappers(resolve(changed), resolveComponentVariants(aliases, dictionary));
		expect(source).toMatch(/gap\?: [^;]*\b14\b/);
		expect(source).toContain('"positive"');
	});

	it('rejects malformed behavior metadata', () => {
		const changed = structuredClone(catalog);
		changed.classes.sidebar.behaviors.sticky.options = ['true'];
		expect(() => resolve(changed)).toThrow('boolean behavior cannot have options');
		delete changed.classes.sidebar.behaviors.sticky.options;
		changed.classes.sidebar.behaviors.sticky.attribute = 'onClick';
		expect(() => resolve(changed)).toThrow('invalid or duplicate behavior attribute');
	});

	it('rejects collisions with React control props', () => {
		const changed = structuredClone(catalog);
		changed.classes.sidebar.behaviors.render = { attribute: 'data-render', options: ['anything'] };
		expect(() => reactWrappers(resolve(changed), {})).toThrow('conflicting React props');
	});
});
