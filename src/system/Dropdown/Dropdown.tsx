/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React, { ReactNode } from 'react';

import { DropdownContent, DropdownContentProps } from './DropdownContent';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownTrigger = DropdownMenuPrimitive.Trigger;
const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownItemIndicator = DropdownMenuPrimitive.DropdownMenuItemIndicator;
const DropdownSub = DropdownMenuPrimitive.DropdownMenuSub;

export interface DropdownProps {
	trigger: ReactNode;
	children: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: ( open: boolean ) => void;
	modal?: boolean;
	dir?: 'ltr' | 'rtl';
	contentProps?: DropdownContentProps;
	portalProps?: object;
	className?: string;
}

/**
 * Root Dropdown component that wraps Radix DropdownMenu
 * with VIP Design System styling and behavior
 */
export const Dropdown: React.FC< DropdownProps > = ( {
	trigger,
	children,
	open = undefined,
	defaultOpen = false,
	onOpenChange = undefined,
	modal = true,
	dir = 'ltr',
	contentProps = {},
	portalProps = {},
} ) => (
	<DropdownMenu
		open={ open }
		defaultOpen={ defaultOpen }
		onOpenChange={ onOpenChange }
		modal={ modal }
		dir={ dir }
	>
		<DropdownTrigger className="vip-dropdown-trigger" asChild>
			{ trigger }
		</DropdownTrigger>

		<DropdownMenuPrimitive.Portal { ...portalProps }>
			<DropdownContent { ...contentProps }>
				{ children }
				<DropdownMenuPrimitive.Arrow sx={ { fill: 'background', boxShadow: 'high' } } />
			</DropdownContent>
		</DropdownMenuPrimitive.Portal>
	</DropdownMenu>
);

// Export only the Radix primitives that we don't have custom implementations for
export { DropdownTrigger, DropdownRadioGroup, DropdownItemIndicator, DropdownSub };
