/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';
import { Link, LinkProps, Theme, ThemeUIStyleObject } from 'theme-ui';

import { VIP_NAV } from '.';
import { NavProps, NavVariant } from './Nav';
import { navItemLinkStyles, navItemStyles } from './styles';

export interface NavItemTheme extends Theme {
	outline?: Record< string, string >;
}

export interface NavItemBaseProps extends NavigationMenu.NavigationMenuItemProps {
	className?: string;
	variant?: NavVariant;
	sx?: ThemeUIStyleObject;
	orientation?: NavProps[ 'orientation' ];
	active?: boolean;
}

const NavItemBase = forwardRef< HTMLLIElement, NavItemBaseProps >(
	(
		{ children, sx = {}, active, orientation, variant, className, ...rest }: NavItemBaseProps,
		ref: Ref< HTMLLIElement >
	) => (
		<NavigationMenu.Item
			className={ classNames( `${ VIP_NAV }-item`, className ) }
			{ ...rest }
			data-active={ active }
			sx={ {
				...navItemStyles( orientation, 'menu' ), // use context
				...sx,
			} }
			ref={ ref }
		>
			{ children }
		</NavigationMenu.Item>
	)
);

export interface NavItemProps extends NavigationMenu.NavigationMenuLinkProps {
	className?: string;
	disabled?: boolean;
	variant?: NavVariant;
	icon?: JSX.Element;
	as?: React.ElementType;
	orientation?: NavProps[ 'orientation' ];
	href?: LinkProps[ 'href' ];
}

const NavItem = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{
			className,
			children,
			href,
			active,
			disabled,
			variant = 'primary',
			orientation,
			icon,
			...rest
		}: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavItemBase className={ className } orientation={ orientation } active={ active }>
			<NavLink
				variant={ variant }
				href={ href }
				ref={ ref }
				active={ active }
				icon={ icon }
				disabled={ disabled }
				{ ...rest }
			>
				{ children }
			</NavLink>
		</NavItemBase>
	)
);

const NavigationMenuLink = NavigationMenu.Link;
const NavLink = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{
			children,
			as = NavigationMenuLink,
			icon,
			href,
			active,
			disabled,
			variant = 'primary',
			...rest
		}: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<Link
			as={ as }
			className={ classNames( `${ VIP_NAV }-item-link` ) }
			ref={ ref }
			href={ href }
			sx={ navItemLinkStyles( variant ) }
			data-active={ active }
			aria-current={ active ? 'page' : undefined }
			aria-disabled={ disabled }
			{ ...rest }
		>
			{ icon }
			{ children }
		</Link>
	)
);

export const ItemPrimary = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItem variant="primary" ref={ ref } { ...props } />
	)
);

export const ItemTab = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItem variant="tabs" ref={ ref } { ...props } />
	)
);

export const ItemToolbar = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItem variant="toolbar" ref={ ref } { ...props } />
	)
);

export interface NavItemMenuProps extends NavItemProps {
	icon?: JSX.Element;
}

export const ItemMenu = forwardRef< HTMLAnchorElement, NavItemMenuProps >(
	( props: NavItemMenuProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItem variant="menu" ref={ ref } { ...props } />
	)
);
