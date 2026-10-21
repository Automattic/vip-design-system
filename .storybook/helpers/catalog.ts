import type { ArgTypes } from '@storybook/react';
import optionSets from '../../tokens/configuration/option-sets.json';
import box from '../../tokens/configuration/compositions/box.json';
import cluster from '../../tokens/configuration/compositions/cluster.json';
import cover from '../../tokens/configuration/compositions/cover.json';
import frame from '../../tokens/configuration/compositions/frame.json';
import grid from '../../tokens/configuration/compositions/grid.json';
import reel from '../../tokens/configuration/compositions/reel.json';
import repel from '../../tokens/configuration/compositions/repel.json';
import sidebar from '../../tokens/configuration/compositions/sidebar.json';
import stack from '../../tokens/configuration/compositions/stack.json';
import switcher from '../../tokens/configuration/compositions/switcher.json';
import withIcon from '../../tokens/configuration/compositions/with-icon.json';
import wrapper from '../../tokens/configuration/compositions/wrapper.json';
import flow from '../../tokens/configuration/utilities/flow.json';
import region from '../../tokens/configuration/utilities/region.json';
import badgeTokens from '../../tokens/component/badge.json';

const catalogs = {
	box,
	cluster,
	cover,
	frame,
	grid,
	reel,
	repel,
	sidebar,
	stack,
	switcher,
	'with-icon': withIcon,
	wrapper,
	flow,
	region,
};
type Name = keyof typeof catalogs;
type Setting = { default: string; options: string; target: string };
type Catalog = {
	settings: Record<string, Setting>;
	presets?: Record<string, { options: Record<string, unknown> }>;
	behaviors?: Record<string, { attribute: string; boolean?: boolean; options?: string[] }>;
};
const sets: Record<string, { values: Record<string, unknown>; extends?: string[] }> = optionSets;
const camelCase = (value: string) =>
	value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
const numericOption = (value: string) => (/^\d+(\.\d+)?$/.test(value) ? Number(value) : value);
function options(name: string): string[] {
	const set = sets[name];
	return [...new Set([...(set.extends ?? []).flatMap(options), ...Object.keys(set.values)])];
}

/** Read controls from the same catalogs that generate CSS and React prop unions. */
export function configurationControls(name: Name, api: 'css' | 'react'): ArgTypes {
	const catalog: Catalog = catalogs[name];
	const controls: ArgTypes = {};
	for (const [setting, entry] of Object.entries(catalog.settings)) {
		const attribute = `data-${name}-${setting}`;
		controls[api === 'css' ? attribute : camelCase(setting)] = {
			control: 'select',
			options: options(entry.options).map(api === 'react' ? numericOption : String),
			description: `${attribute} sets --${name}-${setting} on ${entry.target === 'children' ? 'direct children' : 'this instance'}.`,
			table: {
				category: 'Configuration',
				defaultValue: { summary: entry.default },
				type: {
					summary: options(entry.options)
						.map((value) => JSON.stringify(api === 'react' ? numericOption(value) : value))
						.join(' | '),
				},
			},
		};
	}
	for (const [preset, entry] of Object.entries(catalog.presets ?? {})) {
		controls[api === 'css' ? `data-${name}-${preset}` : camelCase(preset)] = {
			control: 'select',
			options: Object.keys(entry.options),
			description: 'A coordinated preset. Prefer this over individual color overrides.',
			table: { category: 'Presets' },
		};
	}
	for (const [behavior, entry] of Object.entries(catalog.behaviors ?? {})) {
		controls[api === 'css' ? entry.attribute : camelCase(behavior)] = {
			control: entry.boolean ? 'boolean' : 'select',
			...(!entry.boolean && { options: [undefined, ...(entry.options ?? [])] }),
			description: entry.boolean
				? `Presence of ${entry.attribute} enables this behavior; omit it to disable.`
				: `${entry.attribute} selects this behavior; omit for the default.`,
			table: { category: 'Behavior' },
		};
	}
	return controls;
}

export type CSSArgs = Record<string, string | number | boolean | undefined>;
export function cssAttributes(args: CSSArgs) {
	return Object.fromEntries(
		Object.entries(args).map(([key, value]) => [
			key,
			value === true ? '' : value === false ? undefined : value,
		])
	);
}

export const badgeVariants = Object.keys(badgeTokens.badge.variants).filter(
	(key) => !key.startsWith('$')
);
export const badgeAliases = Object.keys(
	badgeTokens.badge.variants.$extensions['com.automattic.vip.css'].aliases
);
export const badgeControls: ArgTypes = {
	variant: {
		control: 'select',
		options: [...badgeAliases, ...badgeVariants],
		description: 'Semantic names and color names select the same six variants.',
		table: { defaultValue: { summary: 'gray' } },
	},
};

export const renderControls: ArgTypes = {
	render: {
		control: false,
		description:
			'A React element or callback. Use `render={<section />}` to choose markup, or `render={<Stack />}` to compose styles on one element.',
	},
	children: { control: false },
	className: {
		control: 'text',
		description: 'Additional CSS classes, merged with the component’s base classes.',
	},
	ref: { control: false },
};

export function counterpart(section: string, name: string, label: string) {
	return `[${label}](?path=/docs/${section}-${name}--docs)`;
}

export function reactDescription(name: Name | 'badge', description: string) {
	const section =
		name === 'badge'
			? 'block-styles'
			: name === 'flow' || name === 'region'
				? 'utility-styles'
				: 'composition-styles';
	return `${description}\n\nNumeric options are numbers; named options are strings. Omitted props use CSS defaults. Native attributes and className pass through. Use \`render\` to choose an element or compose components on one element; classes, styles, events and refs are merged by Base UI.\n\nSee ${counterpart(section, name, 'the CSS class and data-attribute API')}.`;
}
