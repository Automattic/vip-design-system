import { ThemeUIStyleObject } from 'theme-ui';

import { defaultItemLinkStyles } from './primary';
import { NavProps } from '../../Nav';

// Tab Root Styles <nav>
const getTabPropsByOrientation = (
	orientation: NavProps[ 'orientation' ],
	fadeStyles: ThemeUIStyleObject
): ThemeUIStyleObject => {
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
			overflowY: 'hidden',
			// Room for the 3px focus halo on the links, which `overflow` would otherwise
			// clip. The negative margin cancels it, keeping the nav's bottom border flush
			// with the active item's underline.
			py: '4px',
			my: '-4px',
			scrollbarWidth: 'none',
			msOverflowStyle: 'none',
			'&::-webkit-scrollbar': { display: 'none' },
			...fadeStyles,
			// Never fade a focused link's outline (WCAG 2.4.11 Focus Not Obscured).
			'&:focus-within': { maskImage: 'none', WebkitMaskImage: 'none' },
		},
		ul: {
			minWidth: 'max-content',
			flexWrap: 'nowrap',
		},
	};
};

export const tabRootStyles = (
	orientation: NavProps[ 'orientation' ],
	fadeStyles: ThemeUIStyleObject = {}
): ThemeUIStyleObject => ( {
	width: '100%',
	minWidth: 0,
	borderColor: 'borders.2',
	gap: 2,

	// Responsive in case the content is bigger than the viewport
	...getTabPropsByOrientation( orientation, fadeStyles ),
} );

// Tab Link <a>
export const tabItemLinkStyles: ThemeUIStyleObject = {
	...defaultItemLinkStyles,
	px: 2,
	height: '100%',
	color: 'heading',
	whiteSpace: 'nowrap',
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
