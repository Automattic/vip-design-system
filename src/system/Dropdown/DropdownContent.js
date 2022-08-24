/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const styles = {
	minWidth: 220,
	borderRadius: 6,
	backgroundColor: 'background',
	boxShadow: 'high',
	px: 2,
	py: 1,
};

export const DropdownContent = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuContent ref={ forwardRef } sx={ styles } { ...props } />
) );

DropdownContent.displayName = 'DropdownContent';

export const DropdownSubContent = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.DropdownMenuSubContent ref={ forwardRef } sx={ styles } { ...props } />
	</DropdownMenuPrimitive.Portal>
) );

DropdownSubContent.displayName = 'DropdownSubContent';
