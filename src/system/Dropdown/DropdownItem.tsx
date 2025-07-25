/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { BiLoaderAlt, BiQuestionMark, BiCheck } from 'react-icons/bi';
import { ThemeUIStyleObject } from 'theme-ui';

import { Badge } from '../Badge';

// Extract Badge variant type from the Badge component
type BadgeVariant = NonNullable< React.ComponentProps< typeof Badge >[ 'variant' ] >;

/**
 * Props for the DropdownItem component
 */
export interface DropdownItemProps extends DropdownMenuPrimitive.MenuItemProps {
	/** Additional CSS class name */
	className?: string;
	/** Main text content of the item */
	label?: string;
	/** Leading icon element */
	icon?: React.ReactNode | null;
	/** Whether to show a check mark indicating selection */
	isSelected?: boolean;
	/** Whether to show a badge on the right side */
	showBadge?: boolean;
	/** Whether to show an icon before the label (when icon is provided) */
	showIcon?: boolean;
	/** Secondary text displayed after the main label */
	secondaryLabel?: string;
	/** @deprecated Use secondaryLabel prop directly - this prop is redundant */
	hasSecondaryLabel?: boolean;
	/** Visual state of the item */
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
	/** Custom badge component (overrides default badge) */
	badge?: React.ReactNode;
	/** Badge variant when using default badge */
	badgeVariant?: BadgeVariant;
	/** Badge text content when using default badge */
	badgeText?: string;
}

/**
 * Props for DropdownRadioItem component
 */
export interface DropdownRadioItemProps extends DropdownMenuPrimitive.MenuRadioItemProps {
	/** Additional CSS class name */
	className?: string;
}

/**
 * Props for DropdownCheckboxItem component
 */
export interface DropdownCheckboxItemProps extends DropdownMenuPrimitive.MenuCheckboxItemProps {
	/** Additional CSS class name */
	className?: string;
}

/**
 * Props for DropdownSubTrigger component
 */
export interface DropdownSubTriggerItemProps
	extends DropdownMenuPrimitive.DropdownMenuSubTriggerProps {
	/** Additional CSS class name */
	className?: string;
}

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
	height: 32, // Changed from 25 to 32px (min-h-8)
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'text.secondary', // #514e4d
	paddingLeft: '28px', // 24px + 4px = 28px total left padding (no design token available)
	paddingRight: 'space.4', // 16px right padding
	paddingTop: 'space.1', // 4px vertical padding
	paddingBottom: 'space.1', // 4px vertical padding
	fontSize: 'fontSize.2', // 14px main text
	fontFamily: 'body',
	fontWeight: 'regular',
	lineHeight: 1.5,
	gap: '6px', // 6px gap between elements (no design token available)
	'&:hover, &:focus': {
		backgroundColor: 'input.hover', // #f4f3f2
		textDecoration: 'none',
	},
	'&[data-disabled]': {
		color: 'text.disabled', // #9b9796
		pointerEvents: 'none',
	},
	'&[data-highlighted]': {
		backgroundColor: 'input.hover',
	},
};

/**
 * Loading state icon component
 */
const LoadingIcon = () => <BiLoaderAlt size={ 20 } sx={ { color: 'icon.primary' } } />;

/**
 * Empty state icon component
 */
const EmptyIcon = () => <BiQuestionMark size={ 20 } sx={ { color: 'icon.primary' } } />;

/**
 * Check mark icon for selected state
 * Positioned absolutely at top-left of the item
 */
const CheckIcon = () => (
	<BiCheck
		size={ 20 }
		sx={ {
			position: 'absolute',
			left: 'space.1', // 4px from left
			top: '6px', // 6px from top (no design token available)
			color: 'icon.primary',
		} }
	/>
);

/**
 * Dropdown item component with support for various states and features
 *
 * @example
 * ```tsx
 * // Basic item
 * <DropdownItem label="Edit Profile" />
 *
 * // With icon
 * <DropdownItem label="Settings" icon={<SettingsIcon />} showIcon />
 *
 * // With badge
 * <DropdownItem label="Beta Feature" showBadge badgeVariant="blue" badgeText="Beta" />
 *
 * // Loading state
 * <DropdownItem state="loading" />
 *
 * // Selected state
 * <DropdownItem label="Current Option" isSelected />
 *
 * // With secondary label
 * <DropdownItem label="John Doe" secondaryLabel="Administrator" />
 * ```
 */
export const DropdownItem = React.forwardRef< HTMLDivElement, DropdownItemProps >(
	(
		{
			className,
			label,
			icon,
			isSelected = false,
			showBadge = false,
			showIcon = false,
			secondaryLabel,
			hasSecondaryLabel, // Deprecated but kept for backward compatibility
			state = 'default',
			badge,
			badgeVariant = 'yellow',
			badgeText = 'Primary',
			children,
			...props
		},
		forwardRef
	) => {
		// Determine content based on state
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
				? React.cloneElement( icon as React.ReactElement, { size: 20 } )
				: icon;
		}

		// Use secondaryLabel directly, fallback to hasSecondaryLabel for backward compatibility
		const shouldShowSecondaryLabel = secondaryLabel || hasSecondaryLabel;

		return (
			<DropdownMenuPrimitive.DropdownMenuItem
				className={ classNames( 'vip-dropdown-menu-item', className ) }
				ref={ forwardRef }
				sx={ styles }
				disabled={ state === 'disabled' }
				{ ...props }
			>
				{ /* Selected state check mark - absolute positioned */ }
				{ isSelected && <CheckIcon /> }

				{ /* Leading icon */ }
				{ displayIcon && (
					<div sx={ { display: 'flex', alignItems: 'center', flexShrink: 0 } }>{ displayIcon }</div>
				) }

				{ /* Label content area */ }
				<div
					sx={ {
						display: 'flex',
						alignItems: 'center',
						flex: 1,
						gap: shouldShowSecondaryLabel ? '6px' : 0, // Consistent 6px gap
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
								fontSize: 'fontSize.1', // 12px
								fontFamily: 'body',
								fontWeight: 'regular',
								lineHeight: 1.5,
								color: 'text.secondary',
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
				{ showBadge && ( badge ? badge : <Badge variant={ badgeVariant }>{ badgeText }</Badge> ) }
			</DropdownMenuPrimitive.DropdownMenuItem>
		);
	}
);

DropdownItem.displayName = 'DropdownItem';

/**
 * Dropdown checkbox item component
 */
export const DropdownCheckboxItem = React.forwardRef< HTMLDivElement, DropdownCheckboxItemProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.CheckboxItem
			className={ classNames( 'vip-dropdown-checkbox-item', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

/**
 * Dropdown radio item component
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

/**
 * Dropdown sub-trigger item component for nested dropdowns
 */
export const DropdownSubTrigger = React.forwardRef< HTMLDivElement, DropdownSubTriggerItemProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.SubTrigger
			className={ classNames( 'vip-dropdown-sub-trigger', className ) }
			ref={ forwardRef }
			sx={ {
				...styles,
				...{
					'&[data-state="open"]': {
						background: 'highlight',
						color: 'primary',
					},
				},
			} }
			{ ...props }
		/>
	)
);

DropdownSubTrigger.displayName = 'DropdownSubTrigger';
