import { ThemeUIStyleObject } from 'theme-ui';

import { defaultLinkComponentStyle } from '../../../Link/Link';

// Breadcrumbs Nav Item Style <li>
export const breadcrumbsItemStyles: ThemeUIStyleObject = {
	// This code will generate the breadcrumb separator: /. We create the separator via CSS to hide it from screen readers.
	'&::before': {
		display: 'inline-block',
		margin: '0 0.45em',
		transform: 'rotate(15deg)',
		borderRightColor: 'text',
		borderRightStyle: 'solid',
		borderRightWidth: '0.1em',
		height: '0.8em',
		content: '""',
	},

	'&:not(&[data-active]):first-of-type::before': {
		display: 'none',
	},
};

// Breadcrumbs Link <a>
export const breadcrumbsLinkStyles: ThemeUIStyleObject = {
	...defaultLinkComponentStyle,
	m: 0,
};
