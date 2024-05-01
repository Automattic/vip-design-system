import { ThemeUIStyleObject } from 'theme-ui';

import { defaultItemLinkStyles } from './primary';
import { NavProps } from '../../Nav';

// Tab Root Styles <nav>
const getTabPropsByOrientation = ( orientation: NavProps[ 'orientation' ] ): ThemeUIStyleObject => {
	if ( orientation === 'vertical' ) {
		return {
			'> div:first-of-type': {
				height: '100%',
				overflowY: 'auto',
			},
			ul: {
				minHeight: 'max-content',
			},
		};
	}
	return {
		'> div:first-of-type': {
			width: '100%',
			overflowX: 'auto',
		},
		ul: {
			minWidth: 'max-content',
		},
	};
};

export const tabRootStyles = ( orientation: NavProps[ 'orientation' ] ): ThemeUIStyleObject => ( {
	width: '100%',
	borderColor: 'borders.2',
	gap: 2,

	// Responsive in case the content is bigger than the viewport
	...getTabPropsByOrientation( orientation ),
} );

// Tab Link <a>
export const tabItemLinkStyles: ThemeUIStyleObject = {
	...defaultItemLinkStyles,
	px: 2,
	height: '100%',
	backgroundColor: 'red',
	color: 'heading',
	'&[data-active]': {
		color: 'link',
		fontWeight: 'normal',
		position: 'relative',
		'&::after': {
			position: 'absolute',
			bottom: 0,
			display: 'block',
			width: '100%',
			content: '""',
			height: '0.125rem',
			backgroundColor: 'link',
		},
	},
	'&[aria-disabled="true"]': {
		color: 'muted',
	},
	':hover': { fontWeight: 'regular', color: 'link' },
};
