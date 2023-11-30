import { ThemeUIStyleObject } from 'theme-ui';

import { defaultItemLinkStyles, defaultNavRootStyles } from './primary';

// Toolbar Root Styles <nav>
export const toolbarRootStyles: ThemeUIStyleObject = {
	...defaultNavRootStyles,
	display: [ 'none', 'none', 'flex' ],
	height: '100%',
	ml: 0,
};

// Toolbar Default Link Styles <a>
export const defaultToolbarLinkStyle: ThemeUIStyleObject = {
	color: 'toolbar.text.default',
	textDecoration: 'none',
	borderBottom: 'none',
	display: 'inline-flex',
	alignItems: 'center',
	fontWeight: 500,
	'&:hover': {
		color: 'toolbar.text.hover',
	},
};

// Toolbar Link <a>
export const toolbarItemLinkStyles: ThemeUIStyleObject = {
	...defaultItemLinkStyles,
	position: 'relative',
	ml: 3,
	mr: 3,
	height: '100%',
	...defaultToolbarLinkStyle,

	'&[data-active], &[aria-current="page"]': {
		color: 'toolbar.text.default',
	},
	'&[data-active]:before, &[aria-current="page"]:before': {
		display: 'block',
		content: '""',
		width: '100%',
		height: 3,
		overflow: 'hidden',
		backgroundColor: 'borders.accent',
		position: 'absolute',
		top: 0,
	},
};
