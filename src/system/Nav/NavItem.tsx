/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { VIP_NAV } from '.';
import { NavVariant } from './Nav';
import { navItemStyles } from './styles';

export interface NavItemTheme extends Theme {
	outline?: Record< string, string >;
}

export interface NavItemBaseProps extends NavigationMenu.NavigationMenuItemProps {
	className?: string;
	sx?: ThemeUIStyleObject;
}

const NavItemBase = forwardRef< HTMLLIElement, NavItemBaseProps >(
	( { children, sx = {}, className, ...rest }: NavItemBaseProps, ref: Ref< HTMLLIElement > ) => (
		<NavigationMenu.Item
			className={ classNames( `${ VIP_NAV }-item`, className ) }
			{ ...rest }
			sx={ {
				mr: 2,
				'&:last-of-type': {
					mr: 0,
				},

				...sx,
			} }
			ref={ ref }
		>
			{ children }
		</NavigationMenu.Item>
	)
);

const NavLink = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{ children, href, active, disabled, variant = 'primary', ...props }: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavigationMenu.Link
			className={ classNames( `${ VIP_NAV }-item-link` ) }
			href={ href }
			ref={ ref }
			sx={ navItemStyles( variant ) }
			active={ active }
			aria-current={ active ? 'page' : undefined }
			aria-disabled={ disabled }
			{ ...props }
		>
			{ children }
		</NavigationMenu.Link>
	)
);

export interface NavItemProps extends NavigationMenu.NavigationMenuLinkProps {
	className?: string;
	disabled?: boolean;
	variant?: NavVariant;
}

const NavItem = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{ className, children, href, active, disabled, variant = 'primary', ...props }: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavItemBase className={ className }>
			<NavLink
				variant={ variant }
				href={ href }
				ref={ ref }
				active={ active }
				disabled={ disabled }
				{ ...props }
			>
				{ children }
			</NavLink>
		</NavItemBase>
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
