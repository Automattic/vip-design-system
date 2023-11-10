/** @jsxImportSource theme-ui */
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';

import { VIP_NAV } from '.';
import { navMenuListStyles, navStyles } from './styles';

export type NavVariant = 'primary' | 'tabs' | 'toolbar' | 'menu';

export interface NavProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	variant?: NavVariant;
	label: string;
	orientation?: 'horizontal' | 'vertical';
}

const Nav = forwardRef< HTMLElement, NavProps >(
	(
		{ className, children, orientation = 'horizontal', variant = 'primary', label }: NavProps,
		ref: Ref< HTMLElement >
	) => (
		<NavigationMenu.Root
			aria-label={ label }
			ref={ ref }
			className={ classNames( VIP_NAV, className ) }
			sx={ navStyles( variant ) }
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

export const NavPrimary = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => <Nav { ...props } variant="primary" ref={ ref } />
);

export const NavTab = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => <Nav { ...props } variant="tabs" ref={ ref } />
);

export const NavToolbar = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => <Nav { ...props } variant="toolbar" ref={ ref } />
);

export const NavMenu = forwardRef< HTMLElement, NavProps >(
	( props: NavProps, ref: Ref< HTMLElement > ) => (
		<Nav { ...props } variant="menu" orientation="vertical" ref={ ref } />
	)
);
