/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Props for the DropdownLabel component
 */
export interface DropdownLabelProps {
	/** Additional CSS class name */
	className?: string;
}

/**
 * Styles for dropdown group labels
 * Based on Figma design specifications for group titles
 */
export const styles: ThemeUIStyleObject = {
	paddingLeft: 5, // 24px (pl-6 equivalent) - space[5]
	paddingRight: 4, // 16px (pr-4 equivalent) - space[4]
	paddingTop: 1, // 4px (py-1 equivalent) - space[1]
	paddingBottom: 1, // 4px (py-1 equivalent) - space[1]
	fontSize: 1, // 12px - fontSizes[1]
	fontFamily: 'heading', // Aktiv Grotesk VF
	fontWeight: 'semiBold', // 600 weight
	lineHeight: 1.5,
	color: 'text.secondary', // #514e4d
	textTransform: 'uppercase' as const,
	letterSpacing: '0.6px', // TODO: map to design system when token available
};

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
