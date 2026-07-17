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
	/** Forwarded ref to the underlying content element. */
	ref?: React.Ref< HTMLDivElement >;
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
export const DropdownContent = ( {
	className,
	align = 'center',
	ref,
	...props
}: DropdownContentProps ) => (
	<DropdownMenuPrimitive.DropdownMenuContent
		className={ classNames( 'vip-dropdown-menu-content', className ) }
		ref={ ref }
		sx={ styles }
		align={ align }
		{ ...props }
	/>
);

DropdownContent.displayName = 'DropdownContent';

/**
 * The styled content container for a nested sub-menu within a Dropdown.
 */
export const DropdownSubContent = ( { className, ref, ...props }: DropdownContentProps ) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.DropdownMenuSubContent
			className={ classNames( 'vip-dropdown-menu-sub-content', className ) }
			ref={ ref }
			sx={ styles }
			{ ...props }
		/>
	</DropdownMenuPrimitive.Portal>
);

DropdownSubContent.displayName = 'DropdownSubContent';
