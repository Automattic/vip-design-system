/** @jsxImportSource theme-ui */

import React from 'react';

import { DropdownLabel } from './DropdownLabel';
import { DropdownSeparator } from './DropdownSeparator';
import { dropdownGroupStyles } from './styles';

/**
 * Props for the DropdownGroup component
 */
export interface DropdownGroupProps {
	/** Group label text */
	label?: string;
	/** Whether to show a separator at the top of this group */
	separator?: boolean;
	/** Group items */
	children: React.ReactNode;
	/** Additional CSS class name */
	className?: string;
}

/**
 * Dropdown group component that wraps a label and items together
 * Provides proper spacing control and optional separator
 *
 * @example
 * ```tsx
 * <DropdownGroup label="First Group">
 *   <DropdownItem label="Profile" />
 *   <DropdownItem label="Preferences" />
 * </DropdownGroup>
 *
 * <DropdownGroup label="Second Group" separator>
 *   <DropdownItem label="Export Data" />
 *   <DropdownItem label="Delete Account" />
 * </DropdownGroup>
 * ```
 */
export const DropdownGroup = React.forwardRef< HTMLDivElement, DropdownGroupProps >(
	( { label, separator = false, children, className, ...props }, forwardRef ) => (
		<div
			ref={ forwardRef }
			sx={ dropdownGroupStyles }
			className={ className }
			data-name=".dropdown/group"
			{ ...props }
		>
			{ separator && <DropdownSeparator /> }
			{ label && <DropdownLabel>{ label }</DropdownLabel> }
			{ children }
		</div>
	)
);

DropdownGroup.displayName = 'DropdownGroup';
