/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { BiQuestionMark, BiCheck, BiCircle } from 'react-icons/bi';

import { Spinner } from '../Spinner';

/**
 * Shared icon components for dropdown items
 * These icons are used across DropdownItem, DropdownCheckboxItem, and DropdownRadioItem
 */

/**
 * Loading state icon component
 */
export const LoadingIcon = () => <Spinner size={ 16 } color="icon.primary" />;

/**
 * Empty state icon component
 */
export const EmptyIcon = () => <BiQuestionMark size={ 16 } sx={ { color: 'icon.primary' } } />;

/**
 * Check mark icon for selected state
 * Positioned absolutely at top-left of the item
 */
export const CheckIcon = () => (
	<BiCheck
		size={ 16 }
		sx={ {
			position: 'absolute',
			left: 1, // 4px from left - space[1]
			top: 2, // 8px from top
			color: 'icon.primary',
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
		size={ 16 }
		sx={ {
			position: 'absolute',
			left: 1, // 4px from left - space[1]
			top: 2, // 8px from top (matches Figma top-1.5)
			color: state === 'disabled' ? 'icon.disabled' : 'icon.primary',
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
			position: 'absolute',
			left: 1, // 4px from left - space[1]
			top: 2, // 8px from top (matches Figma top-1.5)
			width: '16px',
			height: '16px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		} }
	>
		<div
			sx={ {
				width: '8px', // Smaller filled circle (matches Figma inset-[8.333%])
				height: '8px',
				borderRadius: '50%',
				backgroundColor: state === 'disabled' ? 'icon.disabled' : 'icon.primary',
			} }
		/>
	</DropdownMenuPrimitive.ItemIndicator>
);
