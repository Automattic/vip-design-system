/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import { dropdownGroupLabelStyles } from './styles';

/**
 * Props for the DropdownLabel component
 */
export interface DropdownLabelProps {
	/** Additional CSS class name */
	className?: string;
	/** Label content */
	children?: React.ReactNode;
}

/**
 * Styles for dropdown group labels
 * Based on Figma design specifications for group titles
 */
export const styles = dropdownGroupLabelStyles;

/**
 * Dropdown label component for grouping dropdown items
 * Displays uppercase text with semibold weight
 *
 * @example
 * ```tsx
 * <DropdownLabel>Account Settings</DropdownLabel>
 * <DropdownItem label="Profile" />
 * <DropdownItem label="Preferences" />
 * ```
 */
export const DropdownLabel = React.forwardRef< HTMLDivElement, DropdownLabelProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuLabel
			className={ classNames( 'vip-dropdown-menu-label', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownLabel.displayName = 'DropdownLabel';
