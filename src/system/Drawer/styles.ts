/** @jsxImportSource theme-ui */

import { keyframes } from '@emotion/react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

import { DrawerProps, responsiveDimensionsProp, responsiveProp } from './Drawer';

interface ThemeProps extends Theme {
	drawer?: Record< string, Record< string, string > >;
}

const slideIn = ( theme: ThemeProps, variant: DrawerProps[ 'variant' ] ) => {
	if ( variant && theme.drawer && theme.drawer[ variant ] ) {
		return keyframes( {
			from: { transform: theme.drawer[ variant ].transform },
			to: { transform: 'translate3d(0,0,0)' },
		} );
	}
};

const slideOut = ( theme: ThemeProps, variant: DrawerProps[ 'variant' ] ) => {
	if ( variant && theme.drawer && theme.drawer[ variant ] ) {
		return keyframes( {
			from: { transform: 'translate3d(0,0,0)' },
			to: { transform: theme.drawer[ variant ].transform },
		} );
	}
};

export const drawerContentStyles = (
	variant: DrawerProps[ 'variant' ],
	dimensions?: responsiveDimensionsProp
): ThemeUIStyleObject => {
	const width: responsiveProp = dimensions?.width || [ '100%', '100%', '80vw' ];
	const height: responsiveProp = dimensions?.height || '100vh';
	const minWidth: responsiveProp = dimensions?.minWidth || '16rem';
	const minHeight: responsiveProp = dimensions?.minHeight || '100vh';
	const maxWidth: responsiveProp = dimensions?.maxWidth || '22rem';
	const maxHeight: responsiveProp = dimensions?.maxHeight || '100vh';

	const defaultStyles: ThemeUIStyleObject = {
		p: 0,
		m: 0,
		backgroundColor: 'layer.2',
		boxShadow: 'medium',
		position: 'fixed',
		top: 0,
		bottom: 0,
		width,
		height,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,

		variant: `drawer.${ variant }.styles`,

		// Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
		// Affects animated and non-animated dialogs alike.
		willChange: 'transform',

		'&[data-state="open"]': {
			animation: theme => `${ slideIn( theme, variant ) } 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
		},

		'&[data-state="closed"]': {
			animation: theme => `${ slideOut( theme, variant ) } 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
		},
	};

	switch ( variant ) {
		case 'left-header':
		case 'right-header': {
			return {
				...defaultStyles,
				backgroundColor: 'layer.1',
				top: 64,
			};
		}
		default: {
			return defaultStyles;
		}
	}
};

const fadeIn = keyframes( {
	from: { opacity: '0' },
	to: { opacity: '1' },
} );

const fadeOut = keyframes( {
	from: { opacity: '1' },
	to: { opacity: '0' },
} );

export const drawerOverlayStyles = ( variant: DrawerProps[ 'variant' ] ): ThemeUIStyleObject => {
	const defaultStyles: ThemeUIStyleObject = {
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'backgrounds.overlay',

		'&[data-state="open"]': {
			animation: `${ fadeIn } 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
		},

		'&[data-state="closed"]': {
			animation: `${ fadeOut } 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
		},
	};

	switch ( variant ) {
		case 'left-header':
		case 'right-header': {
			return {
				...defaultStyles,
				top: 64,
			};
		}
		default: {
			return defaultStyles;
		}
	}
};
