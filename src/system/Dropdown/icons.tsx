/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { BiQuestionMark, BiCheck, BiCircle, BiSquare, BiCheckSquare } from 'react-icons/bi';

import { Spinner } from '../Spinner';

/**
 * Shared icon components for dropdown items
 * These icons are used across DropdownItem, DropdownCheckboxItem, and DropdownRadioItem
 */
export const iconSize = 16;
const iconColor = 'icon.primary';
const iconPosition = {
	position: 'absolute',
	left: 1,
	top: 2,
} as const;
/**
 * Loading state icon component
 */
export const LoadingIcon = () => <Spinner size={ iconSize } color={ iconColor } />;

/**
 * Empty state icon component
 */
export const EmptyIcon = () => <BiQuestionMark size={ iconSize } sx={ { color: iconColor } } />;

/**
 * Check mark icon for selected state
 * Positioned absolutely at top-left of the item
 */
export const CheckIcon = () => (
	<BiCheck
		size={ iconSize }
		sx={ {
			color: iconColor,
			...iconPosition,
		} }
	/>
);

/**
 * Checkbox empty square icon
 * Always visible for checkbox items
 */
export const CheckboxEmptyIcon = ( {
	state = 'default',
}: {
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
} ) => (
	<BiSquare
		size={ iconSize }
		sx={ {
			...iconPosition,
			color: state === 'disabled' ? 'icon.disabled' : iconColor,
		} }
	/>
);

/**
 * Checkbox filled (checked) icon
 * Only visible when checkbox item is checked
 */
export const CheckboxFilledIcon = ( {
	state = 'default',
}: {
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
} ) => (
	<BiCheckSquare
		size={ iconSize }
		sx={ {
			...iconPosition,
			color: state === 'disabled' ? 'icon.disabled' : iconColor,
		} }
	/>
);

/**
 * Radio button empty circle icon
 * Always visible for radio items
 */
export const RadioEmptyIcon = ( {
	state = 'default',
}: {
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
} ) => (
	<BiCircle
		size={ iconSize }
		sx={ {
			...iconPosition,
			color: state === 'disabled' ? 'icon.disabled' : iconColor,
		} }
	/>
);

/**
 * Radio button filled indicator
 * Only visible when radio item is selected
 */
export const RadioFilledIndicator = ( {
	state = 'default',
}: {
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
} ) => (
	<DropdownMenuPrimitive.ItemIndicator
		sx={ {
			...iconPosition,
			width: iconSize,
			height: iconSize,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		} }
	>
		<div
			sx={ {
				width: iconSize / 2,
				height: iconSize / 2,
				borderRadius: '50%',
				backgroundColor: state === 'disabled' ? 'icon.disabled' : iconColor,
			} }
		/>
	</DropdownMenuPrimitive.ItemIndicator>
);
