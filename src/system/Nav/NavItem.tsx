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
import { Button } from '..';

interface NavItemTheme extends Theme {
	outline?: Record< string, string >;
}

export interface NavItemBaseProps extends NavigationMenu.NavigationMenuItemProps {
	className?: string;
	sx?: ThemeUIStyleObject | undefined;
}

const NavItemBase = ( { children, sx = {}, className, ...rest }: NavItemBaseProps ) => (
	<NavigationMenu.Item
		className={ classNames( `${ VIP_NAV }-item`, className ) }
		{ ...rest }
		sx={ { mr: 2, ...sx } }
	>
		{ children }
	</NavigationMenu.Item>
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

export interface NavItemGroupProps extends NavItemProps {
	label: string;
	children: React.ReactComponentElement< typeof NavItem >[];
}

// Temporary, will be replaced by a proper NavItemGroup component after the first release version
export const NavItemGroup = forwardRef< HTMLDivElement, NavItemGroupProps >(
	( { label, className }: NavItemGroupProps, ref: Ref< HTMLDivElement > ) => (
		<NavItemBase className={ className }>
			<NavigationMenu.Trigger className="NavigationMenuTrigger" asChild>
				<Button variant="tertiary">{ label }</Button>
			</NavigationMenu.Trigger>
			<NavigationMenu.Content className="NavigationMenuContent" ref={ ref }>
				<ul className="List one">
					<li style={ { gridRow: 'span 3' } }>
						<NavigationMenu.Link asChild>
							<a className="Callout" href="/">
								<svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
									<path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
									<path d="M12 0H4V8H12V0Z"></path>
									<path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
								</svg>
								<div className="CalloutHeading">Radix Primitives</div>
								<p className="CalloutText">Unstyled, accessible components for React.</p>
							</a>
						</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavItemBase>
	)
);

export default NavItem;
