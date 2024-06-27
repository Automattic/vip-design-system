/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

export interface DropdownItemProps extends DropdownMenuPrimitive.MenuItemProps {
	className?: string;
}

export interface DropdownRadioItemProps extends DropdownMenuPrimitive.MenuRadioItemProps {
	className?: string;
}

export interface DropdownCheckboxItemProps extends DropdownMenuPrimitive.MenuCheckboxItemProps {
	className?: string;
}

export interface DropdownSubTriggerItemProps
	extends DropdownMenuPrimitive.DropdownMenuSubTriggerProps {
	className?: string;
}

export const styles: ThemeUIStyleObject = {
	unset: 'all',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row',
	textAlign: 'left',
	height: 25,
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'heading',
	px: 2,
	paddingLeft: 3,
	py: 1,
	'&:hover, &:focus': {
		backgroundColor: 'hover',
		textDecoration: 'none',
	},
	'&[data-disabled]': {
		color: 'muted',
		pointerEvents: 'none',
	},
	'&[data-highlighted]': {
		backgroundColor: 'hover',
		color: 'link',
	},
};

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

export const DropdownRadioItem = React.forwardRef< HTMLDivElement, DropdownRadioItemProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.RadioItem
			className={ classNames( 'vip-dropdown-radio-item', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownRadioItem.displayName = 'DropdownRadioItem';

export const DropdownSubTrigger = React.forwardRef< HTMLDivElement, DropdownSubTriggerItemProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.SubTrigger
			className={ classNames( 'vip-dropdown-sub-trigger', className ) }
			ref={ forwardRef }
			sx={ {
				...styles,
				...{
					'&[data-state="open"]': {
						background: 'highlight',
						color: 'primary',
					},
				},
			} }
			{ ...props }
		/>
	)
);

DropdownSubTrigger.displayName = 'DropdownSubTrigger';
