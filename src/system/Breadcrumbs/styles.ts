import { ThemeUIStyleObject } from 'theme-ui';

import { linkUnderlineProperties } from '../Link/Link';
import { breadcrumbsLinkStyles } from '../Nav/styles/variants/breadcrumbs';

export const smallestScreenItemStyles = {
	'&::before': {
		display: 'inline-block',
		margin: 0,
		mr: 1,
		transform: 'rotate(0deg)',
		border: 'none',
		color: 'link',
		height: '0.8em',
		content: "'←'",
	},
};

export const collapsibleSeparatorStyles: ThemeUIStyleObject = {
	all: 'unset',
	...breadcrumbsLinkStyles,
	...linkUnderlineProperties,
};
