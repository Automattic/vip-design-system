/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';
import { useWindowSize, useIsMounted } from 'usehooks-ts';

export const VIP_BREACRUMBS = 'vip-breadcrumbs-component';

import { collapsibleSeparatorStyles } from './styles';
import { breadcrumbLinks, getListItemsFromBreadcrumb, grabItemsVisibility } from './utils';
import { ItemBreadcrumb, NavItemProps, NavRawLink } from '../Nav/NavItem';
import { navItemStyles, navMenuListStyles } from '../Nav/styles';

export type BreadcrumbsLinkProps = {
	href?: string;
	label?: string;
	active?: boolean;
	width?: number;
	linkIndex?: number;
	visible?: boolean;
	sx?: ThemeUIStyleObject;
};

export interface BreacrumbsProps extends NavigationMenu.NavigationMenuProps {
	className?: string;
	label?: string;
	LinkComponent: NavItemProps[ 'as' ];
	links?: BreadcrumbsLinkProps[];
}

export type ItemsProp = {
	items: BreadcrumbsLinkProps[];
	allItemsWidth?: number;
};

export const Breadcrumbs = forwardRef< HTMLElement, BreacrumbsProps >(
	(
		{ className, links = [], label = 'Breadcrumbs', LinkComponent = NavRawLink }: BreacrumbsProps,
		ref
	) => {
		const isMounted = useIsMounted();
		const [ expanded, setExpanded ] = useState( false );
		const [ itemsInfo, setItemsInfo ] = useState< ItemsProp >( {
			items: [],
			allItemsWidth: 0,
		} );

		const breadcrumbsListRef = useRef< HTMLOListElement >( null );
		const expanderRef = useRef< HTMLLIElement >( null );
		const translate = useTranslate();

		const { width: windowSize } = useWindowSize( {
			debounceDelay: 50,
		} );

		useEffect( () => {
			const breadcrumbList = breadcrumbsListRef?.current;

			if ( ! breadcrumbList || ! isMounted || links?.length === 0 ) {
				return;
			}

			let allItemsWidth = 0;

			const items = getListItemsFromBreadcrumb( breadcrumbsListRef )?.map( ( item, index ) => {
				const width = item?.clientWidth || 0;

				allItemsWidth += width;

				return { linkIndex: index, visible: true, width };
			} );

			setItemsInfo( { items, allItemsWidth } );
		}, [ links, isMounted ] );

		useEffect( () => {
			const breadcrumbList = breadcrumbsListRef?.current;
			const expander = expanderRef?.current;

			if ( ! breadcrumbList || ! expander || itemsInfo?.items?.length === 0 ) {
				return;
			}

			const refLinks = getListItemsFromBreadcrumb( breadcrumbsListRef );
			const itemsVisibility = grabItemsVisibility( refLinks, itemsInfo, expanded );
			const allItemsCanFit = itemsVisibility.every( item => item );

			refLinks.map( ( item, index ) => {
				const visible = itemsVisibility[ index ];

				item.style.visibility = visible ? 'visible' : 'hidden';
				item.style.order = visible ? '1' : '5';

				return item;
			} );

			expander.style.display = ! allItemsCanFit && ! expanded ? 'block' : 'none';
		}, [ windowSize, itemsInfo, expanded ] );

		if ( links?.length === 0 ) {
			return null;
		}

		const { firstLink, lastLink, otherLinks } = breadcrumbLinks( links );

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
						{ firstLink && lastLink && (
							<ItemBreadcrumb
								active={ firstLink.active }
								sx={ {
									...firstLink.sx,
									order: 1,
								} }
								key={ firstLink.href }
								as={ LinkComponent }
								href={ firstLink.href }
							>
								{ firstLink.label }
							</ItemBreadcrumb>
						) }

						{ otherLinks.map( link => (
							<ItemBreadcrumb
								active={ link.active }
								sx={ {
									...link.sx,
									order: 1,
								} }
								key={ link.href }
								as={ LinkComponent }
								href={ link.href }
							>
								{ link.label }
							</ItemBreadcrumb>
						) ) }

						<li
							ref={ expanderRef }
							sx={ {
								...navItemStyles( 'horizontal', 'breadcrumbs' ),
								order: 1,
								display: 'none',
							} }
						>
							<button
								sx={ collapsibleSeparatorStyles }
								aria-label={ translate( 'Press to show more breadcrumbs' ) }
								onClick={ () => setExpanded( true ) }
							>
								…
							</button>
						</li>

						{ lastLink && (
							<li
								sx={ {
									...navItemStyles( 'horizontal', 'breadcrumbs' ),
									order: 1,
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
