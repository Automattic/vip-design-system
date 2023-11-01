/** @jsxImportSource theme-ui */
import React, { Ref, forwardRef } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';

import './style.css';

import { VIP_NAV } from '.';
import { ThemeUIStyleObject } from 'theme-ui';
import { NavItemProps } from './NavItem';

export interface NavProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	variant?: 'primary' | 'secondary' | 'display' | 'ghost';
	sx?: ThemeUIStyleObject;
}

const Nav = forwardRef< HTMLElement, NavProps >(
	(
		{ className, children, orientation, variant = 'primary', sx = {} }: NavProps,
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
				ref={ ref }
				className={ classNames( VIP_NAV, className ) }
				sx={ {
					position: 'relative',
					display: 'flex',
					justifyContent: 'flex-start',
					width: '100%',
					zIndex: 1,
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
					} }
				>
					{ childrenWithVariant }
				</NavigationMenu.List>
			</NavigationMenu.Root>
		);
	}
);

export default Nav;
