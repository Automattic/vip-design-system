/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

import { NavItemRenderIconProp, NavProps, NavVariant, VIP_NAV } from './Nav';
import { IconContainer, ItemGroupMenu } from './NavItemGroup';
import { navItemLinkStyles, navItemStyles } from './styles';

export const NAV_ITEM_ICON_SIZE = 20;

export interface NavItemTheme extends Theme {
	outline?: Record< string, string >;
}

export interface NavItemBaseProps extends NavigationMenu.NavigationMenuItemProps {
	/** Additional CSS class name for the nav item. */
	className?: string;
	/** The visual style variant of the nav item. */
	variant?: NavVariant;
	/** Theme UI style overrides. */
	sx?: ThemeUIStyleObject;
	/** The layout direction inherited from the parent Nav. */
	orientation?: NavProps[ 'orientation' ];
	/** Whether this nav item is currently active/selected. */
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

export type NavItemAsProp = React.ComponentType< {
	href?: string;
	'aria-disabled'?: boolean;
	disabled?: boolean;
	ref?: Ref< HTMLAnchorElement >;
	children?: React.ReactNode;
} >;

export interface NavItemProps extends NavigationMenu.NavigationMenuLinkProps {
	/** Additional CSS class name for the nav item link. */
	className?: string;
	/** Whether the nav item is disabled and non-interactive. */
	disabled?: boolean;
	/** The visual style variant of the nav item.
	 * @default 'primary'
	 */
	variant?: NavVariant;
	/** Render function for an optional leading icon. Receives the icon size as argument. */
	renderIcon?: NavItemRenderIconProp;
	/** The URL the nav item links to. */
	href?: string;
	/** Theme UI style overrides. */
	sx?: ThemeUIStyleObject;
	/** Custom link component to render instead of the default anchor element. */
	as?: NavItemAsProp;
	/** The layout direction inherited from the parent Nav. */
	orientation?: NavProps[ 'orientation' ];
}

const NavItemRoot = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{ className, children, active, variant = 'primary', orientation, ...rest }: NavItemProps,
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

export const NavRawLink = forwardRef< HTMLAnchorElement >(
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	( props, ref: Ref< HTMLAnchorElement > ) => <a { ...props } ref={ ref } />
);

const NavLink = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{
			children,
			as: LinkComponent = NavRawLink,
			renderIcon,
			href,
			active,
			disabled,
			variant = 'primary',
			sx = {},
			...rest
		}: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavigationMenu.Link
			className={ classNames( `${ VIP_NAV }-item-link` ) }
			ref={ ref }
			sx={ {
				...navItemLinkStyles( variant ),
				...sx,
			} }
			href={ href }
			data-active={ active || undefined }
			aria-current={ active ? 'page' : undefined }
			aria-disabled={ disabled }
			asChild
			{ ...rest }
		>
			<LinkComponent>
				{ renderIcon ? <IconContainer>{ renderIcon( NAV_ITEM_ICON_SIZE ) }</IconContainer> : null }
				{ children }
			</LinkComponent>
		</NavigationMenu.Link>
	)
);

export const ItemPrimary = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItemRoot variant="primary" ref={ ref } { ...props } />
	)
);

export const ItemBreadcrumb = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItemRoot variant="breadcrumbs" ref={ ref } { ...props } />
	)
);

export const ItemTab = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItemRoot variant="tabs" ref={ ref } { ...props } />
	)
);

export const ItemToolbar = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItemRoot variant="toolbar" ref={ ref } { ...props } />
	)
);

export const ItemMenu = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItemRoot variant="menu" ref={ ref } { ...props } />
	)
);

export const ItemMenuInverse = forwardRef< HTMLAnchorElement, NavItemProps >(
	( props: NavItemProps, ref: Ref< HTMLAnchorElement > ) => (
		<NavItemRoot variant="menu-inverse" ref={ ref } { ...props } />
	)
);

/**
 * Individual navigation link item with multiple style variants.
 * Use the appropriate sub-component matching the parent Nav variant.
 */
export const NavItem = {
	Primary: ItemPrimary,
	Tab: ItemTab,
	Toolbar: ItemToolbar,
	Menu: ItemMenu,
	MenuGroup: ItemGroupMenu,
	MenuInverse: ItemMenuInverse,
};
