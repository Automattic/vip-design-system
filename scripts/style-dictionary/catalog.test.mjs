// @vitest-environment node
import { describe, expect, it } from 'vitest';
import StyleDictionary from 'style-dictionary';
import { loadCatalog, resolveCatalog } from './catalog.mjs';
import { configurationCSS } from './configuration.mjs';

const catalog = await loadCatalog();
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
const copy = () => structuredClone(catalog);

describe('configuration catalog validation', () => {
	it('resolves every current setting and keeps its public default option', () => {
		const resolved = resolveCatalog(catalog, dictionary);
		expect(
			Object.values(resolved.classes).reduce(
				(count, entry) => count + Object.keys(entry.settings).length,
				0
			)
		).toBe(41);
		expect(resolved.classes.stack.settings.gap.default).toBe('6');
		expect(resolved.classes.stack.settings.gap.defaultValue).toBe('var(--space-comfortable)');
		expect(resolved.classes.sidebar.settings.width.defaultValue).toBe('var(--layout-size-20)');
	});

	it('uses transformed names and preserves variables instead of baking in token values', () => {
		const changed = structuredClone(dictionary);
		const token = changed.allTokens.find((token) => token.path.join('.') === 'space.modest');
		token.name = 'consumer-space-comfortable';
		token.$value = '999px';
		const resolved = resolveCatalog(catalog, changed);
		expect(resolved.classes.stack.settings.gap.values['5']).toBe(
			'var(--consumer-space-comfortable)'
		);
		expect(configurationCSS('stack', resolved.classes.stack)).not.toContain('999px');
	});

	it('does not expose new tokens as new public options automatically', () => {
		const changed = structuredClone(dictionary);
		changed.allTokens.push({
			path: ['space', '14'],
			name: 'space-14',
			$type: 'dimension',
			$value: '20rem',
		});
		expect(resolveCatalog(catalog, changed).classes.stack.settings.gap.values).not.toHaveProperty(
			'14'
		);
	});

	it('rejects missing token references', () => {
		const changed = copy();
		changed.optionSets.space.values['5'] = { token: 'space.missing' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow('unknown token: space.missing');
	});

	it('rejects colors used as dimensions', () => {
		const changed = copy();
		changed.optionSets.space.values['5'] = { token: 'color.text.primary' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow('expected dimension token');
	});

	it('rejects defaults outside the allowed options', () => {
		const changed = copy();
		changed.classes.stack.settings.gap.default = '99';
		expect(() => resolveCatalog(changed, dictionary)).toThrow(
			'default is not an allowed option: 99'
		);
	});

	it('rejects an incompatible option set even if its tokens are valid', () => {
		const changed = copy();
		changed.classes.stack.settings.gap.options = 'color';
		expect(() => resolveCatalog(changed, dictionary)).toThrow('expected dimension option set');
	});

	it('rejects option-set inheritance cycles', () => {
		const changed = copy();
		changed.optionSets.length.extends = ['item-size'];
		expect(() => resolveCatalog(changed, dictionary)).toThrow('circular option-set inheritance');
	});

	it('rejects raw CSS variable names in place of checked references', () => {
		const changed = copy();
		changed.optionSets.space.values['5'] = { literal: 'var(--renamed-token)' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow(
			'use token references or setting templates'
		);
	});

	it('validates local template references and their target scope', () => {
		const changed = copy();
		changed.optionSets['sticky-size'].values.viewport = { template: 'calc(100vh - {missing})' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow('unknown setting: missing');
		changed.optionSets['sticky-size'].values.viewport = { template: 'calc(100vh - {gap})' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow('incompatible setting: gap');
	});

	it('rejects unavailable preset options and incompatible preset references', () => {
		const changed = copy();
		changed.classes.box.presets.surface.options.default.color = { option: 'missing' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow('unknown option: missing');
		changed.classes.box.presets.surface.options.default.color = { setting: 'padding' };
		expect(() => resolveCatalog(changed, dictionary)).toThrow('incompatible setting: padding');
	});
});
