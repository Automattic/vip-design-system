/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React, { ReactNode } from 'react';

import { DropdownContent, DropdownContentProps } from './DropdownContent';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownTrigger = DropdownMenuPrimitive.Trigger;
const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownItemIndicator = DropdownMenuPrimitive.DropdownMenuItemIndicator;
const DropdownLabel = DropdownMenuPrimitive.DropdownMenuLabel;
const DropdownSeparator = DropdownMenuPrimitive.DropdownMenuSeparator;
const DropdownSub = DropdownMenuPrimitive.DropdownMenuSub;
const DropdownSubTrigger = DropdownMenuPrimitive.DropdownMenuSubTrigger;
const DropdownSubContent = DropdownMenuPrimitive.DropdownMenuSubContent;

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

// Exports
export {
	DropdownTrigger,
	DropdownRadioGroup,
	DropdownItemIndicator,
	DropdownLabel,
	DropdownSeparator,
	DropdownSub,
	DropdownSubTrigger,
	DropdownSubContent,
};
