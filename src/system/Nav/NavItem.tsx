/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

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
			data-active={ active || undefined }
			sx={ {
				...navItemStyles( orientation, variant ),
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
	href?: string;
	as?: React.ComponentType< {
		href?: string;
		'aria-disabled'?: boolean;
		children?: React.ReactNode;
	} >;
	orientation?: NavProps[ 'orientation' ];
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
			...rest
		}: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavItemBase
			className={ className }
			orientation={ orientation }
			active={ active }
			variant={ variant }
		>
			<NavLink variant={ variant } ref={ ref } active={ active } { ...rest }>
				{ children }
			</NavLink>
		</NavItemBase>
	)
);

// eslint-disable-next-line jsx-a11y/anchor-has-content
export const NavRawLink = props => <a { ...props } />;

const NavLink = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{
			children,
			as: LinkComponent = NavRawLink,
			icon,
			href,
			active,
			disabled,
			variant = 'primary',
			...rest
		}: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavigationMenu.Link
			className={ classNames( `${ VIP_NAV }-item-link` ) }
			ref={ ref }
			sx={ navItemLinkStyles( variant ) }
			href={ href }
			data-active={ active || undefined }
			aria-current={ active ? 'page' : undefined }
			aria-disabled={ disabled }
			asChild
			{ ...rest }
		>
			<LinkComponent>
				{ icon }
				{ children }
			</LinkComponent>
		</NavigationMenu.Link>
	)
);

export const ItemPrimary = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItem variant="primary" ref={ ref } { ...props } />
	)
);

export const ItemBreadcrumb = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItem variant="breadcrumbs" ref={ ref } { ...props } />
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
