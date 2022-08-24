/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const styles = {
	height: '1px',
	backgroundColor: 'border',
	my: '5px',
};

export const DropdownSeparator = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuSeparator ref={ forwardRef } sx={ styles } { ...props } />
) );

DropdownSeparator.displayName = 'DropdownSeparator';
