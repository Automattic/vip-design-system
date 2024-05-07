import { ThemeUIStyleObject } from 'theme-ui';

import { NavProps, NavVariant } from './Nav';
import { NavItemTheme } from './NavItem';
import { breadcrumbsItemStyles, breadcrumbsLinkStyles } from './styles/variants/breadcrumbs';
import {
	menuInverseItemLinkStyles,
	menuInverseItemStyles,
	menuItemLinkStyles,
	menuItemStyles,
	tabItemStyles,
} from './styles/variants/menu';
import {
	defaultNavItemStyles,
	defaultNavRootStyles,
	primaryItemLinkStyles,
} from './styles/variants/primary';
import { tabItemLinkStyles, tabRootStyles } from './styles/variants/tabs';
import { toolbarItemLinkStyles, toolbarRootStyles } from './styles/variants/toolbar';

// navItemStyles = <li>
// navStyles = <nav>
// MenuItem

export const navItemLinkVariantStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
	switch ( variant ) {
		case 'tabs': {
			return tabItemLinkStyles;
		}

		case 'toolbar': {
			return toolbarItemLinkStyles;
		}

		case 'menu': {
			return menuItemLinkStyles;
		}

		case 'menu-inverse': {
			return menuInverseItemLinkStyles;
		}

		case 'breadcrumbs': {
			return breadcrumbsLinkStyles;
		}

		// Primary and any Other
		case 'primary':
		default: {
			return primaryItemLinkStyles( variant );
		}
	}
};

export const navItemLinkStyles = ( variant: NavVariant ): ThemeUIStyleObject => {
	const itemLinkVariantStyles = navItemLinkVariantStyles( variant );

	return {
		'&:focus-visible': ( theme: NavItemTheme ) => theme.outline,
		...itemLinkVariantStyles,
	};
};

export const navItemStyles = (
	orientation: NavProps[ 'orientation' ],
	variant?: NavVariant
): ThemeUIStyleObject => {
	switch ( variant ) {
		case 'menu': {
			return menuItemStyles( orientation );
		}
		case 'tabs': {
			return tabItemStyles( orientation );
		}
		case 'menu-inverse': {
			return menuInverseItemStyles( orientation );
		}

		case 'breadcrumbs': {
			return breadcrumbsItemStyles;
		}

		default: {
			return defaultNavItemStyles( orientation );
		}
	}
};

export const navStyles = (
	variant: NavVariant,
	orientation: NavProps[ 'orientation' ]
): ThemeUIStyleObject => {
	let navStyle: ThemeUIStyleObject = {};

	switch ( variant ) {
		case 'tabs':
			{
				navStyle = tabRootStyles( orientation );
			}

			break;
		case 'toolbar':
			{
				navStyle = toolbarRootStyles;
			}

			break;
		case 'primary-inverse':
			{
				navStyle = {
					...defaultNavRootStyles,
					px: 5,
					pt: 2,
					pb: 4,
				};
			}

			break;
		default: {
			navStyle = defaultNavRootStyles;
		}
	}

	return {
		'> div:first-of-type': { width: '100%' },
		position: 'relative',
		display: 'flex',
		pb: 0,
		borderBottom: '1px solid',
		...navStyle,
	};
};

export const navMenuListStyles = ( orientation: NavProps[ 'orientation' ] ): ThemeUIStyleObject => {
	return {
		display: 'flex',
		listStyle: 'none',
		justifyContent: 'flex-start',
		m: 0,
		height: '100%',
		gap: 1,
		px: 0,
		flexDirection: orientation === 'horizontal' ? 'row' : 'column',
	};
};
