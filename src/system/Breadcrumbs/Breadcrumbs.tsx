/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useBreakpointIndex } from '@theme-ui/match-media';
import classNames from 'classnames';
import React, { Ref, forwardRef } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

export const VIP_BREACRUMBS = 'vip-breadcrumbs-component';

import { smallestScreenItemStyles } from './styles';
import { ItemBreadcrumb, NavItemProps, NavRawLink } from '../Nav/NavItem';
import { navItemStyles, navMenuListStyles } from '../Nav/styles';

export type BreadcrumbsLinkProps = {
	href?: string;
	label: string;
	active?: boolean;
	sx?: ThemeUIStyleObject;
};

export interface BreacrumbsProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	label?: string;
	LinkComponent: NavItemProps[ 'as' ];
	links?: BreadcrumbsLinkProps[];
}

export const BreadcrumbsBase = forwardRef< HTMLElement, BreacrumbsProps >(
	(
		{ className, links = [], label = 'Breadcrumbs', LinkComponent = NavRawLink }: BreacrumbsProps,
		ref: Ref< HTMLElement >
	) => {
		// The breadcrumb shrinks on smaller screens (mobile) and we need to hide some links
		const bpIndex = useBreakpointIndex( { defaultIndex: 1 } );
		const isSmallestScreen = bpIndex < 2;

		let penultimateLink: BreadcrumbsLinkProps | null = null;
		let lastLink: BreadcrumbsLinkProps | null = null;
		let otherLinks: BreadcrumbsLinkProps[] = [];

		const totalLinks = links?.length || 0;

		if ( totalLinks === 0 ) {
			return null;
		}

		if ( totalLinks === 1 ) {
			lastLink = links?.[ 0 ];
			otherLinks = [];
		}

		if ( totalLinks > 1 ) {
			penultimateLink = links?.[ totalLinks - 2 ];

			otherLinks = isSmallestScreen
				? [
						{
							...penultimateLink,
							active: true,
							sx: smallestScreenItemStyles,
						},
				  ]
				: links?.slice( 0, totalLinks - 1 );

			lastLink = isSmallestScreen ? null : links?.[ totalLinks - 1 ];
		}

		return (
			<NavigationMenu.Root
				aria-label={ label }
				ref={ ref }
				className={ classNames( VIP_BREACRUMBS, className ) }
				orientation="horizontal"
			>
				<NavigationMenu.List
					className={ classNames( `${ VIP_BREACRUMBS }-list` ) }
					sx={ navMenuListStyles( 'horizontal' ) }
					asChild
				>
					<ol>
						{ otherLinks.map( link => (
							<ItemBreadcrumb
								active={ link.active }
								sx={ link.sx }
								key={ link.href }
								as={ LinkComponent }
								href={ link.href }
							>
								{ link.label }
							</ItemBreadcrumb>
						) ) }

						{ lastLink && (
							<li
								sx={ {
									...navItemStyles( 'horizontal', 'breadcrumbs' ),
									color: 'text',
								} }
								data-current="page"
							>
								{ lastLink?.label }
							</li>
						) }
					</ol>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		);
	}
);
