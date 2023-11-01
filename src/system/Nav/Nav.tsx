/** @jsxImportSource theme-ui */
import React, { Ref, forwardRef } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';

import { VIP_NAV } from '.';
import { ThemeUIStyleObject } from 'theme-ui';
import { NavItemProps } from './NavItem';

export interface NavProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	variant?: 'primary' | 'secondary' | 'display' | 'text' | 'tabs';
	sx?: ThemeUIStyleObject;
	label: string;
}

const Nav = forwardRef< HTMLElement, NavProps >(
	(
		{ className, children, orientation, variant = 'primary', sx = {}, label }: NavProps,
		ref: Ref< HTMLElement >
	) => {
		const childrenWithVariant = React.Children.map(
			children as React.ReactElement< NavItemProps >,
			child => {
				if ( React.isValidElement( child ) ) {
					return React.cloneElement( child, { variant } );
				}

				return child;
			}
		);

		return (
			<NavigationMenu.Root
				aria-label={ label }
				ref={ ref }
				className={ classNames( VIP_NAV, className ) }
				sx={ {
					position: 'relative',
					display: 'flex',
					justifyContent: 'flex-start',
					width: 'max-content',
					zIndex: 1,
					padding: 2,
					pb: 0,
					borderRadius: 1,
					borderBottom: '1px solid',
					borderColor: variant === 'tabs' ? 'borders.2' : 'transparent',
					...sx,
				} }
				orientation={ orientation }
			>
				<NavigationMenu.List
					className={ classNames( `${ VIP_NAV }-list` ) }
					sx={ {
						display: 'flex',
						listStyle: 'none',
						justifyContent: 'flex-start',
						m: 0,
						px: 0,
						flexDirection: 'row',
						'.vip-nav-component-item:last-child': {
							mr: 0,
						},
					} }
				>
					{ childrenWithVariant }
				</NavigationMenu.List>
			</NavigationMenu.Root>
		);
	}
);

export default Nav;
