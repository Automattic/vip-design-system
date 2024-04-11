import { ThemeUIStyleObject } from 'theme-ui';

import { defaultNavItemStyles } from './primary';
import { NavProps } from '../../Nav';

type MixedStyleProp = {
	[ key: string ]: string | number | MixedStyleProp | ThemeUIStyleObject;
};

// Menu Item Style <li>
export const menuItemStyles = ( orientation: NavProps[ 'orientation' ] ): ThemeUIStyleObject => ( {
	...defaultNavItemStyles( orientation ),
	mr: 0,
	border: 'none',
	height: 38,
	width: '100%',
	justifyContent: 'space-between',
} );

// Menu Inverse Item Style <li>
export const menuInverseItemStyles = (
	orientation: NavProps[ 'orientation' ]
): ThemeUIStyleObject => ( {
	...menuItemStyles( orientation ),
	width: '100%',
	mr: 0,
	height: 45,
	color: 'toolbar.text.default',
} );

// Menu Item Link <a>

const visitedLink = '&:visited';
const activeAfter = '&[data-active]::after';
const active = '&[data-active]';
const focusNotActiveHoverNotActive = '&:focus:not(&[data-active]), &:hover:not(&[data-active])';
const notHover = ':not(&:hover)';
const svgIcon = 'svg';

export const menuItemLinkStyles: MixedStyleProp = {
	position: 'relative',
	alignItems: 'center',
	backgroundColor: 'layer.1',
	border: 'none',
	borderRadius: 1,
	color: 'text',
	display: 'inline-flex',
	fontSize: '0.875rem',
	fontWeight: 'body',
	height: 38,
	mx: 0,
	mb: 0,
	pt: 3,
	pr: 4,
	pb: 3,
	pl: 5,
	gap: 1,
	textDecoration: 'none',
	width: '100%',
	[ visitedLink ]: {
		color: 'text',
	},
	[ activeAfter ]: {
		position: 'absolute',
		content: "''",
		overflow: 'hidden',
		width: 3,
		backgroundColor: 'borders.accent',
		borderRadius: '90px',
		height: 26,
		top: '6px',
		left: 3,
	},
	[ active ]: {
		color: 'heading',
		backgroundColor: 'backgrounds.primary',
		textDecoration: 'none',
		cursor: 'default',
		svg: {
			color: 'icon.primary',
			fill: 'icon.primary',
		},
	},
	[ focusNotActiveHoverNotActive ]: {
		color: 'heading',
		backgroundColor: 'layer.3',
		svg: {
			color: 'icon.primary',
		},
	},
	[ notHover ]: {
		transition: 'background-color 200ms ease-out',
	},
	[ svgIcon ]: {
		color: 'icon.primary',
		fill: 'icon.primary',
		width: 20,
		height: 20,
		display: 'block',
	},
};

// Inverse Menu Item Link <a>
export const menuInverseItemLinkStyles = {
	...menuItemLinkStyles,
	backgroundColor: 'toolbar.background',
	color: 'toolbar.text.default',
	[ visitedLink ]:
		typeof menuItemLinkStyles[ visitedLink ] === 'object'
			? {
					...menuItemLinkStyles[ visitedLink ],
					color: 'toolbar.text.default',
			  }
			: {},
	[ active ]:
		typeof menuItemLinkStyles[ active ] === 'object'
			? {
					...menuItemLinkStyles[ active ],
					color: 'toolbar.text.default',
					backgroundColor: 'tool`bar.background',
			  }
			: {},
	[ focusNotActiveHoverNotActive ]:
		typeof menuItemLinkStyles[ focusNotActiveHoverNotActive ] === 'object'
			? {
					...menuItemLinkStyles[ focusNotActiveHoverNotActive ],
					color: 'toolbar.text.hover',
					backgroundColor: 'toolbar.background',
					svg:
						typeof menuItemLinkStyles[ focusNotActiveHoverNotActive ].svg === 'object'
							? {
									...menuItemLinkStyles[ focusNotActiveHoverNotActive ].svg,
									color: 'icon.primary',
							  }
							: {},
			  }
			: {},
};
