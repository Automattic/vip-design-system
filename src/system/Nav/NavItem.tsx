/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { Ref, forwardRef } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { VIP_NAV } from '.';
import { Theme, ThemeUIStyleObject } from 'theme-ui';
import { NavProps } from './Nav';

interface NavItemTheme extends Theme {
	outline?: Record< string, string >;
}

export interface NavItemBaseProps extends NavigationMenu.NavigationMenuItemProps {
	className?: string;
	sx?: ThemeUIStyleObject | undefined;
}

const NavItemBase = forwardRef< HTMLLIElement, NavItemBaseProps >(
	( { children, sx = {}, className, ...rest }: NavItemBaseProps, ref: Ref< HTMLLIElement > ) => (
		<NavigationMenu.Item
			className={ classNames( `${ VIP_NAV }-item`, className ) }
			{ ...rest }
			sx={ { mr: 2, ...sx } }
			ref={ ref }
		>
			{ children }
		</NavigationMenu.Item>
	)
);

const NavLink = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{ children, href, active, disabled, variant, ...props }: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => (
		<NavigationMenu.Link
			className={ classNames( `${ VIP_NAV }-item-link` ) }
			href={ href }
			ref={ ref }
			sx={ styles( variant ) }
			active={ active }
			aria-disabled={ disabled }
			{ ...props }
		>
			{ children }
		</NavigationMenu.Link>
	)
);

export interface NavItemProps extends NavigationMenu.NavigationMenuLinkProps {
	className?: string;
	disabled?: boolean | undefined;
	variant?: NavProps[ 'variant' ];
}

const styles = variant => {
	const defaultVariantStyles: ThemeUIStyleObject =
		variant !== 'tabs'
			? {
					variant: `buttons.${ variant === 'link' ? 'text' : 'tertiary' }`,
					borderRadius: 1,
					'&[data-active]': {
						variant: `buttons.${ variant === 'link' ? 'display' : variant }`,
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
			  }
			: {
					color: 'heading',
					'&[data-active]': {
						color: 'link',
						fontWeight: 'normal',
						boxShadow: 'inset 0 -1px 0 0, 0 1px 0 0',
					},
					'&[aria-disabled="true"]': {
						color: 'muted',
					},
					':hover': { fontWeight: 'regular', color: 'heading' },
			  };

	return {
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
		...defaultVariantStyles,
		'&:focus': ( theme: NavItemTheme ) => theme.outline,
		'&:focus-visible': ( theme: NavItemTheme ) => theme.outline,
	};
};

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

export default NavItem;
