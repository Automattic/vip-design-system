/** @jsxImportSource theme-ui */
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import React, { Ref, forwardRef } from 'react';

export const VIP_BREACRUMBS = 'vip-breadcrumbs-component';

import { ItemBreadcrumb, NavItemProps, NavRawLink } from '../Nav/NavItem';
import { navItemStyles, navMenuListStyles } from '../Nav/styles';

export type BreadcrumbsLinkProps = {
	href?: string;
	label: string;
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
			penultimateLink = null;
		}

		if ( totalLinks > 1 ) {
			lastLink = links?.[ totalLinks - 1 ];
			penultimateLink = links?.[ totalLinks - 2 ];
			otherLinks = links?.slice( 0, totalLinks - 1 ) || [];
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
							<ItemBreadcrumb key={ link.href } as={ LinkComponent } href={ link.href }>
								{ link.label }
							</ItemBreadcrumb>
						) ) }

						{ penultimateLink && (
							<ItemBreadcrumb
								key={ penultimateLink.href }
								as={ LinkComponent }
								href={ penultimateLink.href }
								active
								sx={ {
									display: [ 'none', 'block', 'none' ],
									'&::before': {
										display: 'inline-block',
										margin: 0,
										mr: 1,
										transform: 'rotate(0deg)',
										border: 'none',
										color: 'link',
										height: '0.8em',
										content: "'←'",
									},
								} }
							>
								{ penultimateLink.label }
							</ItemBreadcrumb>
						) }

						<li
							sx={ {
								...navItemStyles( 'horizontal', 'breadcrumbs' ),
								color: 'text',
							} }
							data-current="page"
						>
							{ lastLink?.label }
						</li>
					</ol>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		);
	}
);
