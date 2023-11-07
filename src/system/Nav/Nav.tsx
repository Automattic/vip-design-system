/** @jsxImportSource theme-ui */
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef } from 'react';

import { VIP_NAV } from '.';
import { navStyles } from './styles';

export type NavVariant = 'primary' | 'tabs' | 'toolbar';

export interface NavProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	variant?: NavVariant;
	label: string;
}

const Nav = forwardRef< HTMLElement, NavProps >(
	(
		{ className, children, orientation, variant = 'primary', label }: NavProps,
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
				sx={ {
					display: 'flex',
					listStyle: 'none',
					justifyContent: 'flex-start',
					m: 0,
					height: '100%',
					px: 0,
					flexDirection: 'row',
				} }
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
