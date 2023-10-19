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
