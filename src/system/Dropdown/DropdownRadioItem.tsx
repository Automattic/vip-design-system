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
import { RadioEmptyIcon, RadioFilledIndicator } from './icons';
import { dropdownItemStyles } from './styles';

// Styles imported from shared styles file

/**
 * Props for DropdownRadioItem component
 * Extends Radix RadioItem but adds VIP Design System features
 */
export interface DropdownRadioItemProps
	extends BaseDropdownItemProps,
		DropdownMenuPrimitive.MenuRadioItemProps {
	/** Whether radio is selected - for backward compatibility, but selection is managed by RadioGroup value */
	checked?: boolean;
	/** Custom onSelect handler */
	onSelect?: ( event: Event ) => void;
}

/**
 * Enhanced DropdownRadioItem with full DropdownItem feature parity
 * Always shows a radio button (selected or unselected) instead of conditional indicator
 *
 * @example
 * ```tsx
 * // Basic radio group with proper selection management
 * <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
 *   <DropdownRadioItem value="option1" label="Option 1" />
 *   <DropdownRadioItem value="option2" label="Option 2" />
 * </DropdownMenuRadioGroup>
 *
 * // Enhanced radio item with all features
 * <DropdownRadioItem
 *   value="beta"
 *   label="Beta Feature"
 *   secondaryLabel="Preview version"
 *   icon={<SettingsIcon />}
 *   showIcon
 *   showBadge
 *   badgeVariant="blue"
 *   badgeText="Beta"
 * />
 * ```
 */
export const DropdownRadioItem = React.forwardRef< HTMLDivElement, DropdownRadioItemProps >(
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

		// Extract radio-specific props
		const { checked, onSelect, ...otherProps } = remainingProps;

		const { displayIcon, displayLabel } = useDropdownItemContent( icon, label, showIcon, state );
		const { disabled } = useDropdownItemState( 'radio', { isSelected, state }, { checked } );
		const handleSelect = useDropdownItemEventHandling( 'radio', onSelect );

		// For RadioItems, selection is handled by RadioGroup value matching
		// The filled circle will be handled by Radix's built-in ItemIndicator

		return (
			<DropdownMenuPrimitive.RadioItem
				className={ classNames( 'vip-dropdown-radio-item', className ) }
				ref={ forwardRef }
				sx={ dropdownItemStyles }
				disabled={ disabled }
				onSelect={ handleSelect }
				{ ...otherProps }
			>
				{ /* Radio button - empty circle always visible, filled circle overlays when selected */ }
				<RadioEmptyIcon state={ state } />

				{ /* Filled circle - only visible when selected (matches Figma bxs-circle) */ }
				<RadioFilledIndicator state={ state } />

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
			</DropdownMenuPrimitive.RadioItem>
		);
	}
);

DropdownRadioItem.displayName = 'DropdownRadioItem';
