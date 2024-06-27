/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

export interface DropdownSeparatorProps {
	className?: string;
}

export const styles = {
	height: '1px',
	backgroundColor: 'borders.2',
	my: '5px',
};

export const DropdownSeparator = React.forwardRef< HTMLDivElement, DropdownSeparatorProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuSeparator
			className={ classNames( 'vip-dropdown-menu-separator', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownSeparator.displayName = 'DropdownSeparator';
