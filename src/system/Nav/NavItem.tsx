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
export interface NavItemProps extends NavigationMenu.NavigationMenuLinkProps {
	className?: string;
	disabled?: boolean | undefined;
	sx?: ThemeUIStyleObject | undefined;
	variant?: NavProps[ 'variant' ];
}

const styles = variant => ( {
	backgroundColor: 'transparent',
	mr: 0,
	fontSize: 2,
	borderRadius: 1,
	p: 3,
	px: 4,
	display: 'inline-block',
	color: 'link',
	textDecoration: 'none',
	'&[data-active]': {
		color: `button.${ variant }.label.default`,
		backgroundColor: `button.${ variant }.background.default`,
		fontWeight: 'regular',
		boxShadow: 'inset 0 -1px 0 0',
	},
	'&[aria-disabled="true"]': {
		opacity: 0.7,
		color: 'texts.secondary',
		cursor: 'not-allowed',
	},
	':hover': { fontWeight: 'regular', color: 'link' },
	'&:focus': ( theme: NavItemTheme ) => theme.outline,
	'&:focus-visible': ( theme: NavItemTheme ) => theme.outline,
} );

const NavItem = forwardRef< HTMLAnchorElement, NavItemProps >(
	(
		{ className, children, href, active, disabled, variant = 'primary' }: NavItemProps,
		ref: Ref< HTMLAnchorElement >
	) => {
		return (
			<NavigationMenu.Item className={ classNames( `${ VIP_NAV }-item`, className ) }>
				<NavigationMenu.Link
					className={ classNames( `${ VIP_NAV }-item-link` ) }
					href={ href }
					ref={ ref }
					sx={ styles( variant ) }
					active={ active }
					aria-disabled={ disabled }
				>
					{ children }
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		);
	}
);

export default NavItem;
