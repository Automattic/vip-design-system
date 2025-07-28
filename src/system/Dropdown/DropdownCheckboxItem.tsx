/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import {
	BaseDropdownItemProps,
	useDropdownItemContent,
	useDropdownItemProps,
	useDropdownItemEventHandling,
	useDropdownItemState,
	DropdownItemLabelContent,
	DropdownItemBadge,
	DropdownItemIcon,
} from './DropdownItem';
import { CheckboxEmptyIcon, CheckboxFilledIcon } from './icons';
import { dropdownItemStyles } from './styles';

// Styles imported from shared styles file

/**
 * Props for DropdownCheckboxItem component
 * Extends Radix CheckboxItem but adds VIP Design System features
 */
export interface DropdownCheckboxItemProps
	extends BaseDropdownItemProps,
		DropdownMenuPrimitive.MenuCheckboxItemProps {
	/** Whether checkbox is checked - maps to Radix 'checked' prop */
	checked?: boolean;
	/** Callback when checked state changes */
	onCheckedChange?: ( checked: boolean ) => void;
}

/**
 * Enhanced DropdownCheckboxItem with full DropdownItem feature parity
 * Always shows a checkbox (checked or unchecked) instead of conditional check mark
 *
 * @example
 * ```tsx
 * // Basic checkbox item
 * <DropdownCheckboxItem label="Enable feature" />
 *
 * // Checked state
 * <DropdownCheckboxItem label="Auto-save" isSelected />
 *
 * // With icon and badge
 * <DropdownCheckboxItem
 *   label="Beta Feature"
 *   icon={<SettingsIcon />}
 *   showIcon
 *   showBadge
 *   badgeVariant="blue"
 *   badgeText="Beta"
 * />
 * ```
 */
export const DropdownCheckboxItem = React.forwardRef< HTMLDivElement, DropdownCheckboxItemProps >(
	( props, forwardRef ) => {
		const { commonProps, remainingProps } = useDropdownItemProps( props );
		const {
			className,
			label,
			icon,
			isSelected,
			showBadge,
			showIcon,
			secondaryLabel,
			state,
			badge,
			badgeVariant,
			badgeText,
			children,
		} = commonProps;

		// Extract checkbox-specific props
		const { checked, onCheckedChange, onSelect, ...otherProps } = remainingProps;

		const { displayIcon, displayLabel } = useDropdownItemContent( icon, label, showIcon, state );
		const { isSelected: actualSelected, disabled } = useDropdownItemState(
			'checkbox',
			{ isSelected, state },
			{ checked }
		);
		const handleSelect = useDropdownItemEventHandling( 'checkbox', onSelect );

		// Use actual selected state from shared utility
		const isChecked = actualSelected;

		// Checkbox icons - empty square always visible, checkmark overlays when selected

		return (
			<DropdownMenuPrimitive.CheckboxItem
				className={ classNames( 'vip-dropdown-checkbox-item', className ) }
				ref={ forwardRef }
				sx={ dropdownItemStyles }
				disabled={ disabled }
				checked={ isChecked }
				onCheckedChange={ onCheckedChange }
				onSelect={ handleSelect }
				{ ...otherProps }
			>
				{ /* Checkbox - empty square always visible, checkmark overlays when selected */ }
				<CheckboxEmptyIcon state={ state } />
				{ isChecked && <CheckboxFilledIcon state={ state } /> }

				{ /* Leading icon */ }
				<DropdownItemIcon displayIcon={ displayIcon } />

				{ /* Label content area */ }
				<DropdownItemLabelContent
					displayLabel={ displayLabel }
					secondaryLabel={ secondaryLabel }
					children={ children }
				/>

				{ /* Badge */ }
				<DropdownItemBadge
					showBadge={ showBadge }
					badge={ badge }
					badgeVariant={ badgeVariant }
					badgeText={ badgeText }
				/>
			</DropdownMenuPrimitive.CheckboxItem>
		);
	}
);

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';
