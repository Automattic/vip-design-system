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
	/** The element that toggles the dropdown menu. */
	trigger: ReactNode;
	/** The menu items rendered inside the dropdown. */
	children: ReactNode;
	/** Controls the open state when used as a controlled component. */
	open?: boolean;
	/**
	 * Whether the dropdown is open by default (uncontrolled).
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Callback fired when the dropdown open state changes. */
	onOpenChange?: ( open: boolean ) => void;
	/**
	 * Whether interaction with outside elements is blocked while open.
	 * @default true
	 */
	modal?: boolean;
	/**
	 * The reading direction of the dropdown menu.
	 * @default 'ltr'
	 */
	dir?: 'ltr' | 'rtl';
	/** Props forwarded to the DropdownContent wrapper. */
	contentProps?: DropdownContentProps;
	/** Props forwarded to the Radix Portal component. */
	portalProps?: object;
	/** Additional CSS class name applied to the dropdown trigger. */
	className?: string;
}

/**
 * A dropdown menu component built on Radix UI.
 * Renders a trigger button that opens a positioned menu with items.
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
