/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Base styles for dropdown items
 * Based on Figma design specifications
 */
export const styles: ThemeUIStyleObject = {
	unset: 'all',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row',
	textAlign: 'left',
	height: '32px', // Changed from 25 to 32px (min-h-8)
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'texts.secondary', // #514e4d
	paddingLeft: 5, // 24px + 4px = 28px total left padding (no design token available)
	paddingRight: 4, // 16px right padding - space[4]
	paddingTop: 1, // 4px vertical padding - space[1]
	paddingBottom: 1, // 4px vertical padding - space[1]
	fontSize: 2, // 14px main text - fontSizes[2]
	fontFamily: 'body',
	fontWeight: 'regular',
	lineHeight: 5,
	gap: '6px', // 6px gap between elements (no design token available)
	'&:hover, &:focus': {
		backgroundColor: 'input.hover', // #f4f3f2
		textDecoration: 'none',
	},
	'&[data-disabled]': {
		color: 'texts.disabled', // #9b9796 - matches texts pattern
		pointerEvents: 'none',
	},
	'&[data-highlighted]': {
		backgroundColor: 'input.hover',
	},
};

/**
 * Props for DropdownRadioItem component
 */
export interface DropdownRadioItemProps extends DropdownMenuPrimitive.MenuRadioItemProps {
	/** Additional CSS class name */
	className?: string;
}

/**
 * Dropdown radio item component for radio group selections
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
 *   <DropdownRadioItem value="option1">Option 1</DropdownRadioItem>
 *   <DropdownRadioItem value="option2">Option 2</DropdownRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
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