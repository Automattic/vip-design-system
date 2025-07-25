/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';
import { BiLoaderAlt, BiQuestionMark, BiCheck } from 'react-icons/bi';

export interface DropdownItemProps extends DropdownMenuPrimitive.MenuItemProps {
	className?: string;
	label?: string;                    // Main text
	icon?: React.ReactNode | null;     // Leading icon
	isSelected?: boolean;              // Shows check mark on left (absolute positioned)
	showBadge?: boolean;               // Shows badge on right
	showIcon?: boolean;                // Shows icon before label
	secondaryLabel?: string;           // Secondary text after main label
	hasSecondaryLabel?: boolean;       // Controls secondary label visibility
	state?: "default" | "hover" | "disabled" | "loading" | "empty";
	badge?: React.ReactNode;           // Custom badge component
}

export interface DropdownRadioItemProps extends DropdownMenuPrimitive.MenuRadioItemProps {
	className?: string;
}

export interface DropdownCheckboxItemProps extends DropdownMenuPrimitive.MenuCheckboxItemProps {
	className?: string;
}

export interface DropdownSubTriggerItemProps
	extends DropdownMenuPrimitive.DropdownMenuSubTriggerProps {
	className?: string;
}

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
	color: 'text.secondary', // Using design token for #514e4d
	paddingLeft: '28px', // 24px + 4px = 28px total left padding
	paddingRight: 'space.4', // 16px right padding
	paddingTop: 'space.1', // 4px vertical padding
	paddingBottom: 'space.1', // 4px vertical padding
	fontSize: 'fontSize.2', // 14px main text
	fontFamily: 'body',
	fontWeight: 'regular',
	lineHeight: 1.5,
	gap: '6px', // 6px gap between elements
	'&:hover, &:focus': {
		backgroundColor: 'input.hover', // Design token for #f4f3f2
		textDecoration: 'none',
	},
	'&[data-disabled]': {
		color: 'text.disabled', // Design token for #9b9796
		pointerEvents: 'none',
	},
	'&[data-highlighted]': {
		backgroundColor: 'input.hover',
	},
};

// Loading state icon
const LoadingIcon = () => (
	<BiLoaderAlt size={20} sx={{ color: 'icon.primary' }} />
);

// Empty state icon
const EmptyIcon = () => (
	<BiQuestionMark size={20} sx={{ color: 'icon.primary' }} />
);

// Check mark icon for selected state
const CheckIcon = () => (
	<BiCheck 
		size={20} 
		sx={{ 
			position: 'absolute',
			left: 'space.1', // 4px from left
			top: '6px', // 6px from top
			color: 'icon.primary'
		}} 
	/>
);

// Default badge component
const DefaultBadge = ({ children }: { children: React.ReactNode }) => (
	<div sx={{
		backgroundColor: 'tag.yellow.background', // #ffe2c2
		color: 'tag.yellow.text', // #491d00
		fontSize: 'fontSize.0', // 11px
		fontFamily: 'body',
		fontWeight: 'regular',
		lineHeight: 1,
		px: 2,
		py: 1,
		borderRadius: 1,
		display: 'flex',
		alignItems: 'center',
		flexShrink: 0,
	}}>
		{children}
	</div>
);

export const DropdownItem = React.forwardRef< HTMLDivElement, DropdownItemProps >(
	( { 
		className, 
		label,
		icon,
		isSelected = false,
		showBadge = false,
		showIcon = false,
		secondaryLabel,
		hasSecondaryLabel = false,
		state = "default",
		badge,
		children,
		...props 
	}, forwardRef ) => {
		// Determine content based on state
		let displayIcon = icon;
		let displayLabel = label;
		
		if (state === "loading") {
			displayIcon = <LoadingIcon />;
			displayLabel = "Loading...";
		} else if (state === "empty") {
			displayIcon = <EmptyIcon />;
			displayLabel = "Nothing found...";
		} else if (showIcon && icon) {
			displayIcon = React.isValidElement(icon) ? 
				React.cloneElement(icon as React.ReactElement, { size: 20 }) : 
				icon;
		}

		return (
			<DropdownMenuPrimitive.DropdownMenuItem
				className={ classNames( 'vip-dropdown-menu-item', className ) }
				ref={ forwardRef }
				sx={ styles }
				disabled={ state === "disabled" }
				{ ...props }
			>
				{/* Selected state check mark - absolute positioned */}
				{isSelected && <CheckIcon />}
				
				{/* Leading icon */}
				{displayIcon && (
					<div sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
						{displayIcon}
					</div>
				)}
				
				{/* Label content area */}
				<div sx={{ 
					display: 'flex', 
					alignItems: 'center',
					flex: 1,
					gap: hasSecondaryLabel ? '8px' : 0, // Gap between primary and secondary labels
					overflow: 'hidden',
				}}>
					{/* Primary label */}
					<div sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						flexShrink: 0,
					}}>
						{displayLabel || children}
					</div>
					
					{/* Secondary label */}
					{hasSecondaryLabel && secondaryLabel && (
						<div sx={{
							fontSize: 'fontSize.1', // 12px
							fontFamily: 'body',
							fontWeight: 'regular',
							lineHeight: 1.5,
							color: 'text.secondary',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							minWidth: '40px',
						}}>
							{secondaryLabel}
						</div>
					)}
				</div>
				
				{/* Badge */}
				{showBadge && (
					badge ? badge : <DefaultBadge>Primary</DefaultBadge>
				)}
			</DropdownMenuPrimitive.DropdownMenuItem>
		);
	}
);

DropdownItem.displayName = 'DropdownItem';

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
