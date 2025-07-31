/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import { dropdownSeparatorStyles } from './styles';

/**
 * Props for the DropdownSeparator component
 */
export interface DropdownSeparatorProps {
	/** Additional CSS class name */
	className?: string;
}

/**
 * Styles for dropdown separators/dividers
 * Based on Figma design specifications
 */
export const styles = dropdownSeparatorStyles;

/**
 * Dropdown separator component for visually dividing groups of items
 * Creates a horizontal line with proper spacing
 *
 * @example
 * ```tsx
 * <DropdownItem label="Copy" />
 * <DropdownItem label="Cut" />
 * <DropdownSeparator />
 * <DropdownItem label="Delete" />
 * ```
 */
export const DropdownSeparator = React.forwardRef< HTMLDivElement, DropdownSeparatorProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuSeparator
			className={ classNames( 'vip-dropdown-menu-separator', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownSeparator.displayName = 'DropdownSeparator';
