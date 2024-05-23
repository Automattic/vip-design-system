import { ThemeUIStyleObject } from 'theme-ui';

import { linkUnderlineProperties } from '../Link/Link';
import { breadcrumbsLinkStyles } from '../Nav/styles/variants/breadcrumbs';

export const collapsibleSeparatorStyles: ThemeUIStyleObject = {
	all: 'unset',
	...breadcrumbsLinkStyles,
	...linkUnderlineProperties,
};
