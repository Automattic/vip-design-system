/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import { LoadingIcon, EmptyIcon, CheckIcon, ChevronRightIcon, iconSize } from './icons';
import {
	dropdownItemStyles,
	dropdownItemPrimaryLabelStyles,
	dropdownItemLabelStyles,
	dropdownItemSecondaryLabelStyles,
	dropdownItemIconStyles,
} from './styles';
import { Badge } from '../Badge';

// Extract Badge variant type from the Badge component
type BadgeVariant = NonNullable< React.ComponentProps< typeof Badge >[ 'variant' ] >;

/**
 * Base interface for common dropdown item properties
 * Shared across DropdownItem, DropdownCheckboxItem, and DropdownRadioItem
 */
export interface BaseDropdownItemProps {
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
	/** Visual state of the item */
	state?: 'default' | 'hover' | 'disabled' | 'loading' | 'empty';
	/** Custom badge component (overrides default badge) */
	badge?: React.ReactNode;
	/** Badge variant when using default badge */
	badgeVariant?: BadgeVariant;
	/** Badge text content when using default badge */
	badgeText?: string;
	/** Children content */
	children?: React.ReactNode;
}

/**
 * Shared hook for common dropdown item state logic
 * Handles state-based content determination and icon processing
 */
export const useDropdownItemContent = (
	icon: React.ReactNode | null | undefined,
	label: string | undefined,
	showIcon: boolean,
	state: BaseDropdownItemProps[ 'state' ]
) => {
	return React.useMemo( () => {
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
						size: iconSize,
						width: iconSize,
						height: iconSize,
				  } )
				: icon;
		}

		return { displayIcon, displayLabel };
	}, [ icon, label, showIcon, state ] );
};

/**
 * Shared utility for extracting and applying defaults to common dropdown item props
 * Eliminates duplication in props destructuring and default values across all dropdown item components
 */
export const useDropdownItemProps = < T extends BaseDropdownItemProps >( props: T ) => {
	const {
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
		...remainingProps
	} = props;

	const commonProps = {
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
	} as const;

	return {
		commonProps,
		remainingProps: remainingProps as Omit< T, keyof BaseDropdownItemProps >,
	};
};

/**
 * Shared utility for dropdown item event handling
 * Provides consistent behavior for different item types
 */
export const useDropdownItemEventHandling = (
	itemType: 'item' | 'checkbox' | 'radio',
	onSelect?: ( event: Event ) => void
) => {
	return React.useCallback(
		( event: Event ) => {
			// Checkbox and radio items should prevent dropdown from closing
			if ( itemType === 'checkbox' || itemType === 'radio' ) {
				event.preventDefault();
			}

			// Call custom onSelect if provided
			if ( onSelect ) {
				onSelect( event );
			}
		},
		[ itemType, onSelect ]
	);
};

/**
 * Shared utility for mapping common dropdown item props to Radix-specific props
 * Provides consistent prop handling across different item types
 */
export const useDropdownItemState = (
	itemType: 'item' | 'checkbox' | 'radio',
	commonProps: Pick< BaseDropdownItemProps, 'isSelected' | 'state' >,
	radixProps: { checked?: boolean; value?: string }
) => {
	return React.useMemo( () => {
		const { isSelected, state } = commonProps;
		const { checked } = radixProps;

		// Determine actual selection state based on item type
		let actualSelected = isSelected;

		if ( itemType === 'checkbox' && checked !== undefined ) {
			// For checkbox items, prioritize Radix checked prop
			actualSelected = checked;
		}
		// For radio items, selection is managed by RadioGroup value matching
		// isSelected is only used for visual purposes (like showing badges)

		return {
			isSelected: actualSelected,
			disabled: state === 'disabled',
		};
	}, [ itemType, commonProps, radixProps ] );
};

/**
 * Shared component for dropdown item label content area
 * Handles primary label, secondary label, and their layout
 */
export const DropdownItemLabelContent: React.FC< {
	displayLabel: string | undefined;
	secondaryLabel: string | undefined;
	children: React.ReactNode;
	disabled?: boolean;
} > = ( { displayLabel, secondaryLabel, children, disabled = false } ) => {
	const shouldShowSecondaryLabel = secondaryLabel;

	return (
		<div sx={ dropdownItemLabelStyles }>
			{ /* Primary label - fits content and truncates when needed */ }
			<div sx={ dropdownItemPrimaryLabelStyles }>{ displayLabel || children }</div>

			{ /* Secondary label - maintains minimum width, doesn't truncate */ }
			{ shouldShowSecondaryLabel && secondaryLabel && (
				<div
					sx={ {
						...dropdownItemSecondaryLabelStyles,
						color: disabled ? 'texts.disabled' : 'texts.helper',
					} }
				>
					{ secondaryLabel }
				</div>
			) }
		</div>
	);
};

/**
 * Shared component for dropdown item badge rendering
 * Handles both custom badge and default badge with variants
 */
export const DropdownItemBadge: React.FC< {
	showBadge: boolean;
	badge?: React.ReactNode;
	badgeVariant: BadgeVariant;
	badgeText: string;
	disabled?: boolean;
} > = ( { showBadge, badge, badgeVariant, badgeText, disabled = false } ) => {
	if ( ! showBadge ) return null;

	return badge ? (
		<>{ badge }</>
	) : (
		<Badge
			variant={ badgeVariant }
			sx={ {
				marginBottom: 0, // overriding the default margin bottom of the badge component
				...( disabled && {
					opacity: 0.5, // faking a disabled state
				} ),
			} }
		>
			{ badgeText }
		</Badge>
	);
};

/**
 * Shared component for dropdown item leading icon
 * Handles icon container styling
 */
export const DropdownItemIcon: React.FC< {
	displayIcon: React.ReactNode;
	disabled?: boolean;
} > = ( { displayIcon, disabled = false } ) => {
	if ( ! displayIcon ) return null;

	return (
		<div
			sx={ {
				...dropdownItemIconStyles,
				color: disabled ? 'texts.disabled' : 'inherit', // conditionally set to texts.disabled when disabled
			} }
		>
			{ displayIcon }
		</div>
	);
};

/**
 * Props for the DropdownItem component
 */
export interface DropdownItemProps
	extends BaseDropdownItemProps,
		DropdownMenuPrimitive.MenuItemProps {}

/**
 * Props for DropdownSubTrigger component
 */
export interface DropdownSubTriggerItemProps
	extends BaseDropdownItemProps,
		DropdownMenuPrimitive.DropdownMenuSubTriggerProps {}

// Styles imported from shared styles file

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

		// Extract onSelect for event handling
		const { onSelect, ...otherProps } = remainingProps;

		const { displayIcon, displayLabel } = useDropdownItemContent( icon, label, showIcon, state );
		const { disabled } = useDropdownItemState( 'item', { isSelected, state }, {} );
		const handleSelect = useDropdownItemEventHandling( 'item', onSelect );

		return (
			<DropdownMenuPrimitive.DropdownMenuItem
				className={ classNames( 'vip-dropdown-menu-item', className ) }
				ref={ forwardRef }
				sx={ dropdownItemStyles }
				disabled={ disabled }
				onSelect={ handleSelect }
				{ ...otherProps }
			>
				{ /* Selected state check mark - absolute positioned */ }
				{ isSelected && <CheckIcon /> }

				{ /* Leading icon */ }
				<DropdownItemIcon displayIcon={ displayIcon } disabled={ disabled } />

				{ /* Label content area */ }
				<DropdownItemLabelContent
					displayLabel={ displayLabel }
					secondaryLabel={ secondaryLabel }
					children={ children }
					disabled={ disabled }
				/>

				{ /* Badge */ }
				<DropdownItemBadge
					showBadge={ showBadge }
					badge={ badge }
					badgeVariant={ badgeVariant }
					badgeText={ badgeText }
					disabled={ disabled }
				/>
			</DropdownMenuPrimitive.DropdownMenuItem>
		);
	}
);

DropdownItem.displayName = 'DropdownItem';

/**
 * Dropdown sub-trigger item component for nested dropdowns
 * Supports all the same options as DropdownItem (icon, label, secondary label, badges, states)
 * Automatically includes chevron icon on the right
 *
 * @example
 * ```tsx
 * // Basic sub-trigger
 * <DropdownSubTrigger label="More Options" />
 *
 * // With icon
 * <DropdownSubTrigger label="Settings" icon={<SettingsIcon />} showIcon />
 *
 * // With badge
 * <DropdownSubTrigger label="Beta Features" showBadge badgeVariant="blue" badgeText="Beta" />
 *
 * // With secondary label
 * <DropdownSubTrigger label="John Doe" secondaryLabel="Administrator" />
 * ```
 */
export const DropdownSubTrigger = React.forwardRef< HTMLDivElement, DropdownSubTriggerItemProps >(
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

		const { displayIcon, displayLabel } = useDropdownItemContent( icon, label, showIcon, state );
		const { disabled } = useDropdownItemState( 'item', { isSelected, state }, {} );

		return (
			<DropdownMenuPrimitive.SubTrigger
				className={ classNames( 'vip-dropdown-sub-trigger', className ) }
				ref={ forwardRef }
				sx={ dropdownItemStyles }
				disabled={ disabled }
				{ ...remainingProps }
			>
				{ /* Selected state check mark - absolute positioned */ }
				{ isSelected && <CheckIcon /> }

				{ /* Leading icon */ }
				<DropdownItemIcon displayIcon={ displayIcon } disabled={ disabled } />

				{ /* Label content area */ }
				<DropdownItemLabelContent
					displayLabel={ displayLabel }
					secondaryLabel={ secondaryLabel }
					children={ children }
					disabled={ disabled }
				/>

				{ /* Badge */ }
				<DropdownItemBadge
					showBadge={ showBadge }
					badge={ badge }
					badgeVariant={ badgeVariant }
					badgeText={ badgeText }
					disabled={ disabled }
				/>

				{ /* Chevron icon - always on the right */ }
				<ChevronRightIcon disabled={ disabled } />
			</DropdownMenuPrimitive.SubTrigger>
		);
	}
);

DropdownSubTrigger.displayName = 'DropdownSubTrigger';
