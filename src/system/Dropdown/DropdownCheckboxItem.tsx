/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { BiQuestionMark, BiCheck, BiSquare } from 'react-icons/bi';
import { ThemeUIStyleObject } from 'theme-ui';

import { Badge } from '../Badge';
import { Spinner } from '../Spinner';

// Extract Badge variant type from the Badge component
type BadgeVariant = NonNullable< React.ComponentProps< typeof Badge >[ 'variant' ] >;

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
	height: '32px', 
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'texts.secondary', // #514e4d
	paddingLeft: 5, // 24px total left padding 
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
 * Loading state icon component
 */
const LoadingIcon = () => <Spinner size={ 16 } color="icon.primary" />;

/**
 * Empty state icon component
 */
const EmptyIcon = () => <BiQuestionMark size={ 16 } sx={ { color: 'icon.primary' } } />;

/**
 * Props for DropdownCheckboxItem component
 * Extends Radix CheckboxItem but adds VIP Design System features
 */
export interface DropdownCheckboxItemProps extends DropdownMenuPrimitive.MenuCheckboxItemProps {
	/** Additional CSS class name */
	className?: string;
	/** Item label text */
	label?: string;
	/** Optional icon */
	icon?: React.ReactNode;
	/** Whether checkbox is checked - maps to Radix 'checked' prop */
	isSelected?: boolean;
	/** Show badge */
	showBadge?: boolean;
	/** Show icon */
	showIcon?: boolean;
	/** Secondary label text */
	secondaryLabel?: string;
	/** Item state */
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
	/** Custom badge component */
	badge?: React.ReactNode;
	/** Badge variant */
	badgeVariant?: BadgeVariant;
	/** Badge text */
	badgeText?: string;
	/** Children */
	children?: React.ReactNode;
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
	(
		{
			className,
			label,
			icon,
			isSelected = false,
			showBadge = false,
			showIcon = false,
			secondaryLabel,
			state = 'default',
			badge,
			badgeVariant = 'yellow',
			badgeText = 'Primary',
			children,
			checked, // Radix checked prop
			onCheckedChange, // Radix onCheckedChange prop
			...props
		},
		forwardRef
	) => {
		// Determine content based on state (same logic as DropdownItem)
		let displayIcon = icon;
		let displayLabel = label;

		if ( state === 'loading' ) {
			displayIcon = <LoadingIcon />;
			displayLabel = 'Loading...';
		} else if ( state === 'empty' ) {
			displayIcon = <EmptyIcon />;
			displayLabel = 'Nothing found...';
		} else if ( showIcon && icon ) {
			displayIcon = React.isValidElement( icon )
				? React.cloneElement( icon as React.ReactElement, {
						size: 16, // For react-icons (BiLoaderAlt, etc.)
						width: 16, // For Radix icons (GearIcon, etc.)
						height: 16, // For Radix icons (GearIcon, etc.)
				  } )
				: icon;
		}

		const shouldShowSecondaryLabel = secondaryLabel;

		// Checkbox icons - empty square always visible, checkmark overlays when selected
		const CheckboxIcons = () => (
			<>
				{ /* Empty square - always visible */ }
				<BiSquare
					size={ 16 }
					sx={ {
						position: 'absolute',
						left: 1, // 4px from left - space[1]
						top: 2, // 8px from top
						color: state === 'disabled' ? 'icon.disabled' : 'icon.primary',
					} }
				/>
				{ /* Checkmark - only visible when selected, overlays the square */ }
				{ isChecked && (
					<BiCheck
						size={ 16 }
						sx={ {
							position: 'absolute',
							left: 1, // 4px from left - space[1]
							top: 2, // 8px from top
							color: state === 'disabled' ? 'icon.disabled' : 'icon.primary',
						} }
					/>
				) }
			</>
		);

		// Map our isSelected to Radix's checked prop (prioritize Radix checked if provided)
		const isChecked = checked !== undefined ? checked : isSelected;

		return (
			<DropdownMenuPrimitive.CheckboxItem
				className={ classNames( 'vip-dropdown-checkbox-item', className ) }
				ref={ forwardRef }
				sx={ styles }
				disabled={ state === 'disabled' }
				checked={ isChecked }
				onCheckedChange={ onCheckedChange }
				onSelect={ event => {
					// Prevent dropdown from closing when checkbox is toggled
					event.preventDefault();
				} }
				{ ...props }
			>
				{ /* Checkbox - empty square always visible, checkmark overlays when selected */ }
				<CheckboxIcons />

				{ /* Leading icon */ }
				{ displayIcon && (
					<div sx={ { display: 'flex', alignItems: 'center', flexShrink: 0 } }>{ displayIcon }</div>
				) }

				{ /* Label content area */ }
				<div
					sx={ {
						display: 'flex',
						alignItems: 'baseline', // Align text baselines instead of centering containers
						flex: 1,
						gap: shouldShowSecondaryLabel ? 1 : 0, // Consistent with DropdownItem
						overflow: 'hidden',
					} }
				>
					{ /* Primary label */ }
					<div
						sx={ {
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							flexShrink: 0,
						} }
					>
						{ displayLabel || children }
					</div>

					{ /* Secondary label */ }
					{ shouldShowSecondaryLabel && secondaryLabel && (
						<div
							sx={ {
								fontSize: 1, // 12px - fontSizes[1]
								fontFamily: 'body',
								fontWeight: 'regular',
								lineHeight: 5, // Keep proportional line height (150%)
								color: 'texts.secondary', // Consistent with main text
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								minWidth: '40px',
							} }
						>
							{ secondaryLabel }
						</div>
					) }
				</div>

				{ /* Badge */ }
				{ showBadge && ( badge ? badge : <Badge variant={ badgeVariant } sx={ { marginBottom: 0 } }>{ badgeText }</Badge> ) }
			</DropdownMenuPrimitive.CheckboxItem>
		);
	}
);

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem'; 