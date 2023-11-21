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
	label: string;
	LinkComponent: NavItemProps[ 'as' ];
	links: BreadcrumbsLinkProps[];
}

export const BreadcrumbsBase = forwardRef< HTMLElement, BreacrumbsProps >(
	(
		{ className, links, label, LinkComponent = NavRawLink }: BreacrumbsProps,
		ref: Ref< HTMLElement >
	) => {
		const otherLinksTotal = links.length - 1;
		const otherLinks = links.slice( 0, otherLinksTotal );
		const lastLink = links[ otherLinksTotal ];

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

						<li
							sx={ { ...navItemStyles( 'horizontal', 'breadcrumbs' ), color: 'text' } }
							data-current="page"
						>
							{ lastLink.label }
						</li>
					</ol>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		);
	}
);
