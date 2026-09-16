/** @jsxImportSource theme-ui */
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref } from 'react';

import { navMenuListStyles, navStyles } from './styles';
import { useScrollableTabs } from '../hooks/useScrollableTabs';

export const VIP_NAV = 'vip-nav-component';
export type NavVariant =
	| 'primary'
	| 'tabs'
	| 'toolbar'
	| 'menu'
	| 'menu-inverse'
	| 'breadcrumbs'
	| 'primary-inverse';

export interface NavProps extends NavigationMenu.NavigationMenuProps {
	/** Additional CSS class name for the nav element. */
	className?: string;
	/** The visual style variant of the navigation.
	 * @default 'primary'
	 */
	variant?: NavVariant;
	/** Accessible label for the navigation landmark. */
	label: string;
	/** The layout direction of the navigation items.
	 * @default 'horizontal'
	 */
	orientation?: 'horizontal' | 'vertical';
	/** Ref forwarded to the underlying nav element. */
	ref?: Ref< HTMLElement >;
}

const NavBase = ( {
	className,
	children,
	orientation = 'horizontal',
	variant = 'primary',
	label,
	ref,
}: NavProps ) => {
	const {
		ref: listRef,
		edges,
		fadeStyles,
	} = useScrollableTabs( {
		activeSelector: 'a[data-active]',
		attributeFilter: [ 'data-active' ],
		// Radix's NavigationMenuList renders <div style="position:relative"> around the
		// <ul> and keeps that div's ref for its indicator track, so the scroll container
		// — the element tabRootStyles styles as `> div:first-of-type` — is only
		// reachable as the list's parent.
		resolveScroller: node => node.parentElement,
		enabled: variant === 'tabs' && orientation === 'horizontal',
	} );

	return (
		<NavigationMenu.Root
			aria-label={ label }
			ref={ ref }
			className={ classNames( VIP_NAV, className ) }
			// The scroll container belongs to Radix, so the state lands on the <nav>,
			// which VDS controls, and the styles reach the scroller by descendant
			// selector. TabsList puts these on the scroller itself.
			data-scroll-start={ edges.start || undefined }
			data-scroll-end={ edges.end || undefined }
			sx={ navStyles( variant, orientation, fadeStyles ) }
			orientation={ orientation }
		>
			<NavigationMenu.List
				ref={ listRef as Ref< HTMLUListElement > }
				className={ classNames( `${ VIP_NAV }-list` ) }
				sx={ navMenuListStyles( orientation ) }
			>
				{ children }
			</NavigationMenu.List>
		</NavigationMenu.Root>
	);
};

const NavPrimary = ( { ref, ...props }: NavProps ) => (
	<NavBase { ...props } variant="primary" ref={ ref } />
);

const NavPrimaryInverse = ( { ref, ...props }: NavProps ) => (
	<NavBase { ...props } variant="primary-inverse" ref={ ref } />
);

/**
 * Horizontal tab navigation. The list scrolls sideways when the items no longer fit,
 * fading whichever edge still has items beyond it and revealing the active item.
 *
 * When placing this inside a flex row, the wrapper needs `minWidth: 0` and must not
 * set `flexShrink: 0`, or the tab strip will size to its content instead of scrolling.
 */
const NavTab = ( { ref, ...props }: NavProps ) => (
	<NavBase { ...props } variant="tabs" ref={ ref } />
);

const NavToolbar = ( { ref, ...props }: NavProps ) => (
	<NavBase { ...props } variant="toolbar" ref={ ref } />
);

const NavMenu = ( { ref, ...props }: NavProps ) => (
	<NavBase { ...props } variant="menu" orientation="vertical" ref={ ref } />
);

export type NavItemRenderIconProp = ( size: number ) => React.JSX.Element | null;

/**
 * Navigation component with multiple style variants built on Radix UI NavigationMenu.
 * Use the appropriate sub-component for each context (Primary, Tab, Toolbar, Menu).
 */
export const Nav = {
	Primary: NavPrimary,
	PrimaryInverse: NavPrimaryInverse,
	Tab: NavTab,
	Toolbar: NavToolbar,
	Menu: NavMenu,
};
