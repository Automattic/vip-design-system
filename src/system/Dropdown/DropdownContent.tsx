/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

export interface DropdownContentProps {
	/** Additional CSS class name applied to the content container. */
	className?: string;
	/**
	 * The horizontal alignment of the content relative to the trigger.
	 * @default 'center'
	 */
	align?: 'start' | 'center' | 'end';
}

export const styles = {
	minWidth: 220,
	borderRadius: 2,
	backgroundColor: 'background',
	boxShadow: 'high',
	px: 2,
	py: 1,
};

/**
 * The styled content container for the Dropdown menu.
 */
export const DropdownContent = React.forwardRef< HTMLDivElement, DropdownContentProps >(
	( { className, align = 'center', ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuContent
			className={ classNames( 'vip-dropdown-menu-content', className ) }
			ref={ forwardRef }
			sx={ styles }
			align={ align }
			{ ...props }
		/>
	)
);

DropdownContent.displayName = 'DropdownContent';

/**
 * The styled content container for a nested sub-menu within a Dropdown.
 */
export const DropdownSubContent = React.forwardRef< HTMLDivElement, DropdownContentProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.DropdownMenuSubContent
				className={ classNames( 'vip-dropdown-menu-sub-content', className ) }
				ref={ forwardRef }
				sx={ styles }
				{ ...props }
			/>
		</DropdownMenuPrimitive.Portal>
	)
);

DropdownSubContent.displayName = 'DropdownSubContent';
