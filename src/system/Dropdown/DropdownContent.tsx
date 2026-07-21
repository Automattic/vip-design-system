/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

export interface DropdownContentProps extends DropdownMenuPrimitive.DropdownMenuContentProps {
	/** Additional CSS class name applied to the content container. */
	className?: string;
	/**
	 * The horizontal alignment of the content relative to the trigger.
	 * @default 'center'
	 */
	align?: 'start' | 'center' | 'end';
	/** Forwarded ref to the underlying content element. */
	ref?: React.Ref< HTMLDivElement >;
	/** Theme UI style overrides applied to the content container. */
	sx?: ThemeUIStyleObject;
}

export interface DropdownSubContentProps extends DropdownMenuPrimitive.DropdownMenuSubContentProps {
	/** Additional CSS class name applied to the sub-content container. */
	className?: string;
	/** Forwarded ref to the underlying sub-content element. */
	ref?: React.Ref< HTMLDivElement >;
	/** Theme UI style overrides applied to the sub-content container. */
	sx?: ThemeUIStyleObject;
}

export const styles: ThemeUIStyleObject = {
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
	sx = {},
	...props
}: DropdownContentProps ) => (
	<DropdownMenuPrimitive.DropdownMenuContent
		className={ classNames( 'vip-dropdown-menu-content', className ) }
		ref={ ref }
		sx={ { ...styles, ...sx } }
		align={ align }
		{ ...props }
	/>
);

DropdownContent.displayName = 'DropdownContent';

/**
 * The styled content container for a nested sub-menu within a Dropdown.
 */
export const DropdownSubContent = ( {
	className,
	ref,
	sx = {},
	...props
}: DropdownSubContentProps ) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.DropdownMenuSubContent
			className={ classNames( 'vip-dropdown-menu-sub-content', className ) }
			ref={ ref }
			sx={ { ...styles, ...sx } }
			{ ...props }
		/>
	</DropdownMenuPrimitive.Portal>
);

DropdownSubContent.displayName = 'DropdownSubContent';
