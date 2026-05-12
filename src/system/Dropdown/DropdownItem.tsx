/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

export interface DropdownItemProps extends DropdownMenuPrimitive.DropdownMenuItemProps {
	/** Additional CSS class name applied to the menu item. */
	className?: string;
	/** The content rendered inside the menu item. */
	children?: React.ReactNode;
}

export interface DropdownRadioItemProps extends DropdownMenuPrimitive.DropdownMenuRadioItemProps {
	/** Additional CSS class name applied to the radio item. */
	className?: string;
	/** The content rendered inside the radio item. */
	children?: React.ReactNode;
}

export interface DropdownCheckboxItemProps
	extends DropdownMenuPrimitive.DropdownMenuCheckboxItemProps {
	/** Additional CSS class name applied to the checkbox item. */
	className?: string;
	/** The content rendered inside the checkbox item. */
	children?: React.ReactNode;
}

export interface DropdownSubTriggerItemProps
	extends DropdownMenuPrimitive.DropdownMenuSubTriggerProps {
	/** Additional CSS class name applied to the sub-menu trigger. */
	className?: string;
}

export const styles: ThemeUIStyleObject = {
	unset: 'all',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row',
	textAlign: 'left',
	minHeight: '32px',
	fontSize: 2,
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'heading',
	px: 2,
	paddingLeft: 3,
	py: 0,
	'&:hover, &:focus': {
		backgroundColor: 'hover',
		textDecoration: 'none',
	},
	'&[data-disabled]': {
		color: 'muted',
		pointerEvents: 'auto',
		cursor: 'not-allowed',
	},
	'&[data-highlighted]': {
		backgroundColor: 'hover',
		color: 'link',
	},
};

/**
 * A single selectable item within a Dropdown menu.
 */
export const DropdownItem = React.forwardRef< HTMLDivElement, DropdownItemProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuItem
			className={ classNames( 'vip-dropdown-menu-item', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownItem.displayName = 'DropdownItem';

/**
 * A toggleable checkbox item within a Dropdown menu.
 */
export const DropdownCheckboxItem = React.forwardRef< HTMLDivElement, DropdownCheckboxItemProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.CheckboxItem
			className={ classNames( 'vip-dropdown-checkbox-item', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

/**
 * A radio-selectable item within a Dropdown menu radio group.
 */
export const DropdownRadioItem = React.forwardRef< HTMLDivElement, DropdownRadioItemProps >(
	( { className, value, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.RadioItem
			className={ classNames( 'vip-dropdown-radio-item', className ) }
			ref={ forwardRef }
			sx={ styles }
			value={ value }
			{ ...props }
		/>
	)
);

DropdownRadioItem.displayName = 'DropdownRadioItem';

/**
 * A menu item that opens a nested sub-menu when hovered or clicked.
 */
export const DropdownSubTrigger = React.forwardRef< HTMLDivElement, DropdownSubTriggerItemProps >(
	( { className, disabled, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.SubTrigger
			className={ classNames( 'vip-dropdown-sub-trigger', className ) }
			disabled={ disabled }
			ref={ forwardRef }
			sx={ {
				...styles,
				...{
					'&[data-state="open"]': {
						background: 'highlight',
						color: 'primary',
					},
				},
				...( disabled && {
					cursor: 'not-allowed',
					color: 'muted',
				} ),
			} }
			{ ...props }
		/>
	)
);

DropdownSubTrigger.displayName = 'DropdownSubTrigger';
