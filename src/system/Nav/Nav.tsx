/** @jsxImportSource theme-ui */
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';

import { navMenuListStyles, navStyles } from './styles';

export const VIP_NAV = 'vip-nav-component';
export type NavVariant = 'primary' | 'tabs' | 'toolbar' | 'menu' | 'menu-inverse' | 'breadcrumbs';

export interface NavProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	variant?: NavVariant;
	label: string;
	orientation?: 'horizontal' | 'vertical';
}

const NavBase = forwardRef< HTMLElement, NavProps >(
	(
		{ className, children, orientation = 'horizontal', variant = 'primary', label }: NavProps,
		ref: Ref< HTMLElement >
	) => (
		<NavigationMenu.Root
			aria-label={ label }
			ref={ ref }
			className={ classNames( VIP_NAV, className ) }
			sx={ navStyles( variant, orientation ) }
			orientation={ orientation }
		>
			<NavigationMenu.List
				className={ classNames( `${ VIP_NAV }-list` ) }
				sx={ navMenuListStyles( orientation ) }
			>
				{ children }
			</NavigationMenu.List>
		</NavigationMenu.Root>
	)
);

const NavPrimary = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => (
		<NavBase { ...props } variant="primary" ref={ ref } />
	)
);

const NavTab = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => (
		<NavBase { ...props } variant="tabs" ref={ ref } />
	)
);

const NavToolbar = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => (
		<NavBase { ...props } variant="toolbar" ref={ ref } />
	)
);

const NavMenu = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => (
		<NavBase { ...props } variant="menu" orientation="vertical" ref={ ref } />
	)
);

export type NavItemRenderIconProp = ( size: number ) => JSX.Element | null;

export const Nav = {
	Primary: NavPrimary,
	Tab: NavTab,
	Toolbar: NavToolbar,
	Menu: NavMenu,
};
