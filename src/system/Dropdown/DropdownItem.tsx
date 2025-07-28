/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { BiLoaderAlt, BiQuestionMark, BiCheck } from 'react-icons/bi';
import { ThemeUIStyleObject } from 'theme-ui';

import { Badge } from '../Badge';
import { Spinner } from '../Spinner';

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
	height: '32px',
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'texts.secondary', // #514e4d
	paddingLeft: 5,
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
 * Check mark icon for selected state
 * Positioned absolutely at top-left of the item
 */
const CheckIcon = () => (
	<BiCheck
		size={ 16 }
		sx={ {
			position: 'absolute',
			left: 1, // 4px from left - space[1]
			top: 2, // 8px from top 
			// color: 'icon.primary',
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
				? React.cloneElement( icon as React.ReactElement, {
						size: 16, // For react-icons (BiLoaderAlt, etc.)
						width: 16, // For Radix icons (GearIcon, etc.)
						height: 16, // For Radix icons (GearIcon, etc.)
				  } )
				: icon;
		}

		const shouldShowSecondaryLabel = secondaryLabel;

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
					<div
						sx={ {
							display: 'flex',
							alignItems: 'center',
							flexShrink: 0,
							width: '16px',
							height: '16px',
						} }
					>
						{ displayIcon }
					</div>
				) }

				{ /* Label content area */ }
				<div
					sx={ {
						display: 'flex',
						alignItems: 'baseline', // Align text baselines instead of centering containers
						flex: 1,
						gap: shouldShowSecondaryLabel ? 1 : 0, // Figma shows gap-1 = 4px
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
			</DropdownMenuPrimitive.DropdownMenuItem>
		);
	}
);

DropdownItem.displayName = 'DropdownItem';



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
