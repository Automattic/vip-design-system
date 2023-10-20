/**
 * External dependencies
 */

import { Theme } from 'theme-ui';

export interface ValetTheme {
	[ key: string ]: ValetTheme | ValueEntry;
}

export interface TraversedTheme {
	[ key: string ]: TraversedTheme | ValueEntryValue;
}

export interface ThemeLevel {
	[ key: string ]: string | number | ValueEntryValue;
}

export type VIPTheme = Theme & {
	[ key: string ]: VIPTheme | string | number;
};

export type ValueEntryValue = string | number | HeadingEntry | ShadowEntry[] | LabelEntry;
export type ValueEntry = {
	value: ValueEntryValue;
	type: string;
	description?: string;
};

export type HeadingEntry = {
	fontFamily?: string;
	fontWeight?: string | number;
	lineHeight?: string | number;
	fontSize?: string | number;
	letterSpacing?: string | number;
	color?: string;
};

export type ShadowEntry = {
	color?: string | number;
	type?: string | number;
	x?: string | number;
	y?: string | number;
	blur?: string | number;
	spread?: string | number;
};

export type LabelEntry = {
	fontFamily?: string | number;
	fontWeight?: string | number;
	lineHeight?: string | number;
	fontSize?: string | number;
};

export type VariantList = {
	[ key: string ]: {
		[ key: string ]: ValueEntry;
	};
};

export type ThemeMainEntry =
	| 'space'
	| 'borderRadius'
	| 'background'
	| 'layer'
	| 'input'
	| 'border'
	| 'text'
	| 'link'
	| 'icon'
	| 'button'
	| 'support'
	| 'focus'
	| 'tag'
	| 'sticker'
	| 'toolbar'
	| 'logs'
	| 'option-row'
	| 'fontFamily'
	| 'fontSize'
	| 'lineHeight'
	| 'heading'
	| 'fontWeight'
	| 'body'
	| 'rem'
	| 'shadow'
	| 'letterSpacing'
	| 'paragraphSpacing'
	| 'textCase'
	| 'textDecoration'
	| 'color'
	| 'breakpoint'
	| 'alignment';
