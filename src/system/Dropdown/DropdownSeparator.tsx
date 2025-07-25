/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

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
export const styles = {
	height: '1px',
	backgroundColor: 'border.2', // Design token for #e3e0df
	paddingLeft: 'space.5', // 24px horizontal padding (px-6)
	paddingRight: 'space.5', // 24px horizontal padding (px-6)
	my: 0, // Remove vertical margin since we're using horizontal padding
};

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
