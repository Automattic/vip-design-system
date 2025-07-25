/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Props for the DropdownContent component
 */
export interface DropdownContentProps {
	/** Additional CSS class name */
	className?: string;
	/** Alignment of the dropdown content relative to the trigger */
	align?: 'start' | 'center' | 'end';
}

/**
 * Styles for the dropdown content container
 * Based on Figma design specifications
 */
export const styles: ThemeUIStyleObject = {
	display: 'flex',
	flexDirection: 'column',
	minWidth: '220px',
	borderRadius: 1, // 3px as per design (design token shows 4px but design shows 3px)
	backgroundColor: 'layer.2', // White background (#ffffff)
	boxShadow: 'high', // shadow.3 equivalent
	gap: 2, // 8px gap between items (space/2: 8)
	p: 2, // 8px padding all around (space/2: 8)
};

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
	( { className, align = 'center', ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuContent
			className={ classNames( 'vip-dropdown-menu-content', className ) }
			ref={ forwardRef }
			sx={ styles }
			align={ align }
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
				sx={ styles }
				{ ...props }
			/>
		</DropdownMenuPrimitive.Portal>
	)
);

DropdownSubContent.displayName = 'DropdownSubContent';
