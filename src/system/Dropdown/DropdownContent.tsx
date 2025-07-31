/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import { dropdownContentStyles } from './styles';

/**
 * Props for the DropdownContent component
 */
export interface DropdownContentProps {
	/** Additional CSS class name */
	className?: string;
	/** Alignment of the dropdown content relative to the trigger */
	align?: 'start' | 'center' | 'end';
	/** Children elements */
	children?: React.ReactNode;
	alignOffset?: number;
}

/**
 * Dropdown content container component
 *
 * @example
 * ```tsx
 * <DropdownContent align="start">
 *   <DropdownItem label="Option 1" />
 *   <DropdownItem label="Option 2" />
 * </DropdownContent>
 * ```
 */
export const DropdownContent = React.forwardRef< HTMLDivElement, DropdownContentProps >(
	( { className, align = 'start', alignOffset = 0, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuContent
			className={ classNames( 'vip-dropdown-menu-content', className ) }
			ref={ forwardRef }
			sx={ dropdownContentStyles }
			align={ align }
			alignOffset={ alignOffset }
			avoidCollisions={ true }
			collisionPadding={ 8 }
			{ ...props }
		/>
	)
);

DropdownContent.displayName = 'DropdownContent';

/**
 * Dropdown sub-content container for nested dropdowns
 */
export const DropdownSubContent = React.forwardRef< HTMLDivElement, DropdownContentProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.DropdownMenuSubContent
				className={ classNames( 'vip-dropdown-menu-sub-content', className ) }
				ref={ forwardRef }
				sx={ dropdownContentStyles }
				{ ...props }
			/>
		</DropdownMenuPrimitive.Portal>
	)
);

DropdownSubContent.displayName = 'DropdownSubContent';
