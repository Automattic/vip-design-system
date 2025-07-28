/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { BiQuestionMark, BiCircle } from 'react-icons/bi';
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
	paddingLeft: 5, // 24px total left padding (no design token available)
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
 * Props for DropdownRadioItem component
 * Extends Radix RadioItem but adds VIP Design System features
 */
export interface DropdownRadioItemProps extends DropdownMenuPrimitive.MenuRadioItemProps {
	/** Additional CSS class name */
	className?: string;
	/** Item label text */
	label?: string;
	/** Optional icon */
	icon?: React.ReactNode;
	/** Whether radio is selected - for backward compatibility, but selection is managed by RadioGroup value */
	isSelected?: boolean;
	/** Radix checked prop - not typically used for RadioItems (managed by RadioGroup) */
	checked?: boolean;
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
			onSelect, // Radix onSelect prop
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

		// Radio button icons - empty circle always visible, filled circle overlays when selected
		const RadioIcons = () => (
			<>
				{ /* Empty circle - always visible (matches Figma bx-circle) */ }
				<BiCircle
					size={ 16 }
					sx={ {
						position: 'absolute',
						left: 1, // 4px from left - space[1]
						top: 2, // 8px from top (matches Figma top-1.5)
						color: state === 'disabled' ? 'icon.disabled' : 'icon.primary',
					} }
				/>
			</>
		);

		// For RadioItems, we don't use checked prop - selection is handled by RadioGroup value matching
		// The filled circle will be handled by Radix's built-in ItemIndicator

		return (
			<DropdownMenuPrimitive.RadioItem
				className={ classNames( 'vip-dropdown-radio-item', className ) }
				ref={ forwardRef }
				sx={ styles }
				disabled={ state === 'disabled' }
				onSelect={ event => {
					// Prevent dropdown from closing when radio is selected
					event.preventDefault();
					// Call custom onSelect if provided
					if ( onSelect ) {
						onSelect( event );
					}
				} }
				{ ...props }
			>
				{ /* Radio button - empty circle always visible, filled circle overlays when selected */ }
				<RadioIcons />

				{ /* Filled circle - only visible when selected (matches Figma bxs-circle) */ }
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
							width: '12px', // Smaller filled circle (matches Figma inset-[8.333%])
							height: '12px',
							borderRadius: '50%',
							backgroundColor: state === 'disabled' ? 'icon.disabled' : 'icon.primary',
						} }
					/>
				</DropdownMenuPrimitive.ItemIndicator>

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
			</DropdownMenuPrimitive.RadioItem>
		);
	}
);

DropdownRadioItem.displayName = 'DropdownRadioItem'; 