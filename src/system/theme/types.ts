/**
 * External dependencies
 */

import { Theme } from 'theme-ui';

export interface VIPTheme extends Theme {
	texts: {
		[ key: string ]: unknown;
	};
	outline: {
		outlineStyle: string;
		outlineColor: string;
		outlineWidth: string;
		boxShadow: string;
	};
}

export interface ThemeJSON extends Record< string, Record< string, { value: string } > > {}

export type ValueEntry = {
	value: string | number;
	type: string;
	description?: string;
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
