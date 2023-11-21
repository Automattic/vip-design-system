/** @jsxImportSource theme-ui */
import * as Collapsible from '@radix-ui/react-collapsible';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { Ref, forwardRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import { VIP_NAV } from '.';
import { NavItemBaseProps } from './NavItem';
import {
	itemVariantStyle,
	navItemGroupTriggerStyles,
	navItemGroupStyles,
	navItemGroupContentStyles,
	navItemGroupContentUlStyles,
} from './styles';

export interface NavItemGroupProps extends NavItemBaseProps {
	icon?: JSX.Element;
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
			icon,
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
				data-active={ active || undefined }
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
							sx={ {
								...itemVariantStyle( variant ),
								...navItemGroupTriggerStyles(),
							} }
						>
							{ icon }
							{ label }
							<BiChevronDown
								data-arrow-indicator
								aria-hidden="true"
								size={ 20 }
								sx={ { color: 'icon.secondary' } }
							/>
						</button>
					</Collapsible.Trigger>
					<Collapsible.Content sx={ navItemGroupContentStyles() }>
						<ul sx={ navItemGroupContentUlStyles() }>{ children }</ul>
					</Collapsible.Content>
				</Collapsible.Root>
			</NavigationMenu.Item>
		);
	}
);

export const ItemGroupMenu = forwardRef< HTMLLIElement, NavItemGroupProps >(
	( props: NavItemGroupProps, ref: Ref< HTMLLIElement > ) => (
		<NavItemGroupBase { ...props } orientation="vertical" variant="menu" ref={ ref } />
	)
);
