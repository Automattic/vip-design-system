import { ThemeUIStyleObject } from 'theme-ui';

import { NavProps, NavVariant } from '../../Nav';

// Default Root Styles <nav>
export const defaultNavRootStyles: ThemeUIStyleObject = {
	width: '100%',
	borderColor: 'transparent',
};

// Default List Item style <li>

export const defaultNavItemStyles = (
	orientation: NavProps[ 'orientation' ]
): ThemeUIStyleObject => ( {
	mr: 2,
	'&:last-of-type': {
		mr: orientation === 'horizontal' ? 0 : undefined,
	},
} );

// Default Link <a>
export const defaultItemLinkStyles: ThemeUIStyleObject = {
	alignItems: 'center',
	display: 'inline-flex',
	fontSize: 2,
	justifyContent: 'center',
	lineHeight: 'inherit',
	minHeight: '36px',
	px: 3,
	py: 0,
	textDecoration: 'none',
	verticalAlign: 'middle',
};

// Primary Link <a>
export const primaryItemLinkStyles = ( variant: NavVariant ): ThemeUIStyleObject => ( {
	...defaultItemLinkStyles,
	variant: `buttons.tertiary`,
	borderRadius: 1,
	'&[data-active]': {
		variant: `buttons.${ variant }`,
	},
	'&[aria-disabled="true"]': {
		opacity: 0.7,
		color: 'texts.secondary',
		cursor: 'not-allowed',
	},
	':hover': {
		backgroundColor: `button.${ variant }.background.hover`,
		textDecoration: 'none',
	},
} );
