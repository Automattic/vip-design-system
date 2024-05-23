/** @jsxImportSource theme-ui */

import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';
import { useWindowSize } from 'usehooks-ts';

export const VIP_BREACRUMBS = 'vip-breadcrumbs-component';

import { collapsibleSeparatorStyles } from './styles';
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

const breadcrumbLinks = (
	links: BreadcrumbsLinkProps[]
): {
	lastLink: BreadcrumbsLinkProps | null;
	firstLink: BreadcrumbsLinkProps | null;
	otherLinks: BreadcrumbsLinkProps[];
} => {
	const totalLinks = links?.length;

	let otherLinks = totalLinks > 1 ? links?.slice( 1, totalLinks - 1 ) : [];
	const firstLink: BreadcrumbsLinkProps | null = links?.[ 0 ];
	const lastLink: BreadcrumbsLinkProps | null =
		totalLinks > 1 ? links?.[ totalLinks - 1 ] : firstLink;

	if ( totalLinks === 1 ) {
		otherLinks = [];
	}

	return { firstLink, lastLink, otherLinks };
};

export const Breadcrumbs = forwardRef< HTMLElement, BreacrumbsProps >(
	(
		{ className, links = [], label = 'Breadcrumbs', LinkComponent = NavRawLink }: BreacrumbsProps,
		ref
	) => {
		const [ expanded, setExpanded ] = useState( false );

		const breadcrumbsListRef = useRef< HTMLOListElement >( null );
		const translate = useTranslate();
		const { width: windowSize } = useWindowSize( {
			debounceDelay: 50,
		} );

		const calculateWrappedValue = () => {
			if ( expanded ) {
				return false;
			}

			const breadcrumbList = breadcrumbsListRef?.current;

			if ( ! breadcrumbList ) {
				return;
			}

			const navWidth = breadcrumbList?.parentElement?.clientWidth ?? 0;
			const listWidth = Array.from( breadcrumbsListRef?.current?.querySelectorAll( 'li' ) )?.reduce(
				( acc, item ) => acc + item.clientWidth,
				0
			);

			return listWidth >= navWidth;
		};

		const isWrapped = useMemo( calculateWrappedValue, [ windowSize, expanded ] );

		useEffect( () => {
			if ( ! expanded ) {
				return;
			}

			const breadcrumbList = breadcrumbsListRef?.current;

			if ( ! breadcrumbList ) {
				return;
			}
			const nextActiveLink: HTMLAnchorElement | null =
				breadcrumbList.querySelector( 'li:nth-child(3) a' );

			if ( ! nextActiveLink || document.activeElement === nextActiveLink ) {
				return;
			}

			nextActiveLink?.focus();
		}, [ expanded ] );

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

						<li
							sx={ {
								...navItemStyles( 'horizontal', 'breadcrumbs' ),
								visibility: isWrapped ? 'visible' : 'hidden',
								order: isWrapped ? 1 : 5,
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

						{ otherLinks.map( link => (
							<ItemBreadcrumb
								active={ link.active }
								sx={ {
									...link.sx,
									visibility: isWrapped ? 'hidden' : 'visible',
									order: isWrapped ? 5 : 1,
								} }
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
