/** @jsxImportSource theme-ui */
import * as Collapsible from '@radix-ui/react-collapsible';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { NavItemRenderIconProp, VIP_NAV } from './Nav';
import { NAV_ITEM_ICON_SIZE, NavItemBaseProps } from './NavItem';
import { navItemLinkVariantStyles } from './styles';
import {
	navItemGroupStyles,
	navItemGroupContentStyles,
	navItemGroupContentUlStyles,
	navItemGroupTriggerStyles,
} from './styles/variants/menugroup';

export interface NavItemGroupProps extends NavItemBaseProps {
	renderIcon?: NavItemRenderIconProp;
	activeChildren?: boolean;
	label: string;
}

const NavItemGroupBase = forwardRef< HTMLLIElement, NavItemGroupProps >(
	(
		{
			label,
			variant = 'menu',
			orientation,
			className,
			active,
			activeChildren,
			renderIcon,
			children,
			sx,
		}: NavItemGroupProps,
		ref: Ref< HTMLLIElement >
	) => {
		const [ isExpanded, setIsExpanded ] = useState( active );

		const handleExpand = ( openValue: boolean ) => setIsExpanded( openValue );

		return (
			<NavigationMenu.Item
				className={ classNames( `${ VIP_NAV }-item`, className ) }
				ref={ ref }
				sx={ {
					...navItemGroupStyles( orientation, variant ),
					...sx,
				} }
			>
				<Collapsible.Root defaultOpen={ active } open={ isExpanded } onOpenChange={ handleExpand }>
					<Collapsible.Trigger asChild>
						<button
							type="button"
							aria-haspopup={ true }
							data-active={ active || undefined }
							data-open={ isExpanded || undefined }
							data-active-children={ activeChildren || undefined }
							sx={ {
								...navItemLinkVariantStyles( variant ),
								...navItemGroupTriggerStyles,
							} }
						>
							{ renderIcon ? (
								<IconContainer>{ renderIcon( NAV_ITEM_ICON_SIZE ) }</IconContainer>
							) : null }
							{ label }

							<BiChevronDown
								data-arrow-indicator
								aria-hidden="true"
								size={ NAV_ITEM_ICON_SIZE }
								sx={ { color: 'icon.secondary' } }
							/>
						</button>
					</Collapsible.Trigger>
					<Collapsible.Content sx={ navItemGroupContentStyles }>
						<ul sx={ navItemGroupContentUlStyles }>{ children }</ul>
					</Collapsible.Content>
				</Collapsible.Root>
			</NavigationMenu.Item>
		);
	}
);

export const IconContainer = ( { children }: { children: React.ReactNode } ) => (
	<div
		sx={ {
			width: 28,
			height: 30,
			alignItems: 'center',
			justifyContent: 'center',
			display: 'inline-flex',
		} }
	>
		{ children }
	</div>
);

export const ItemGroupMenu = forwardRef< HTMLLIElement, NavItemGroupProps >(
	( props: NavItemGroupProps, ref: Ref< HTMLLIElement > ) => (
		<NavItemGroupBase { ...props } orientation="vertical" variant="menu" ref={ ref } />
	)
);
