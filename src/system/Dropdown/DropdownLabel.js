/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const styles = {
	paddingLeft: 10,
	fontSize: 12,
	lineHeight: '25px',
	color: 'muted',
};

export const DropdownLabel = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuLabel ref={ forwardRef } sx={ styles } { ...props } />
) );

DropdownLabel.displayName = 'DropdownLabel';
