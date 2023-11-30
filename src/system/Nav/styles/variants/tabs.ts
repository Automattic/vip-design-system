import { ThemeUIStyleObject } from 'theme-ui';

import { defaultItemLinkStyles } from './primary';

// Tab Root Styles <nav>

export const tabRootStyles: ThemeUIStyleObject = {
	width: '100%',
	borderColor: 'borders.2',
};

// Tab Link <a>
export const tabItemLinkStyles: ThemeUIStyleObject = {
	...defaultItemLinkStyles,
	px: 0,
	mr: 2,
	color: 'heading',
	'&[data-active]': {
		color: 'link',
		fontWeight: 'normal',
		boxShadow: 'inset 0 -1px 0 0, 0 1px 0 0',
	},
	'&[aria-disabled="true"]': {
		color: 'muted',
	},
	':hover': { fontWeight: 'regular', color: 'heading' },
};
