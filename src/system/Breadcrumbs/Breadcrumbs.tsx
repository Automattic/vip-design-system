/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useBreakpointIndex } from '@theme-ui/match-media';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

export const VIP_BREACRUMBS = 'vip-breadcrumbs-component';

import { collapsibleSeparatorStyles, smallestScreenItemStyles } from './styles';
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
	wrapMode?: 'collapsible' | 'lastItem';
	LinkComponent: NavItemProps[ 'as' ];
	links?: BreadcrumbsLinkProps[];
}

const breadcrumbLinks = (
	links: BreadcrumbsLinkProps[],
	isSmallestScreen: boolean = false,
	wrapMode: BreacrumbsProps[ 'wrapMode' ],
	showAllItems: boolean = false
): {
	separatorLink: boolean;
	lastLink: BreadcrumbsLinkProps | null;
	otherLinks: BreadcrumbsLinkProps[];
} => {
	let separatorLink: boolean = false;
	let lastLink: BreadcrumbsLinkProps | null = null;
	let otherLinks: BreadcrumbsLinkProps[] = [];

	const totalLinks = links?.length;

	if ( totalLinks === 1 ) {
		lastLink = links?.[ 0 ];
		otherLinks = [];
	}

	if ( totalLinks > 1 ) {
		const otherLinksRaw = links?.slice( 0, totalLinks - 1 );
		lastLink = links?.[ totalLinks - 1 ];

		if ( wrapMode === 'lastItem' ) {
			const penultimateLink = links?.[ totalLinks - 2 ];
			lastLink = isSmallestScreen ? null : links?.[ totalLinks - 1 ];

			otherLinks = isSmallestScreen
				? [
						{
							...penultimateLink,
							active: true,
							sx: smallestScreenItemStyles,
						},
				  ]
				: otherLinksRaw;
		} else if ( wrapMode === 'collapsible' ) {
			separatorLink = isSmallestScreen && ! showAllItems;
			otherLinks = isSmallestScreen && ! showAllItems ? [ links?.[ 0 ] ] : otherLinksRaw;
		}
	}

	return { separatorLink, lastLink, otherLinks };
};

export const Breadcrumbs = forwardRef< HTMLElement, BreacrumbsProps >(
	(
		{
			className,
			links = [],
			label = 'Breadcrumbs',
			LinkComponent = NavRawLink,
			wrapMode = 'lastItem',
		}: BreacrumbsProps,
		ref
	) => {
		const breadcrumbsListRef = useRef< HTMLOListElement >( null );
		const [ showAllItems, setShowAllItems ] = useState( false );
		const translate = useTranslate();

		// Focus on the next link when the collapsible separator is true
		useEffect( () => {
			if ( wrapMode !== 'collapsible' ) {
				return;
			}

			const breadcrumbList = breadcrumbsListRef?.current;

			if ( showAllItems && breadcrumbList ) {
				const nextActiveLink: HTMLAnchorElement | null =
					breadcrumbList.querySelector( 'li:nth-child(2) a' );

				nextActiveLink?.focus();
			}
		}, [ showAllItems, wrapMode ] );

		// The breadcrumb shrinks on smaller screens (mobile) and we need to hide some links
		const bpIndex = useBreakpointIndex( { defaultIndex: 1 } );
		const isSmallestScreen = bpIndex < 3;

		if ( links?.length === 0 ) {
			return null;
		}

		const { separatorLink, lastLink, otherLinks } = breadcrumbLinks(
			links,
			isSmallestScreen,
			wrapMode,
			showAllItems
		);

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
					ref={ breadcrumbsListRef }
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

						{ separatorLink && (
							<li
								sx={ {
									...navItemStyles( 'horizontal', 'breadcrumbs' ),
								} }
							>
								<button
									sx={ collapsibleSeparatorStyles }
									aria-label={ translate( 'Press to show more breadcrumbs' ) }
									onClick={ () => setShowAllItems( true ) }
								>
									…
								</button>
							</li>
						) }

						{ lastLink && (
							<li
								sx={ {
									...navItemStyles( 'horizontal', 'breadcrumbs' ),
									color: 'text',
								} }
								aria-current="page"
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
