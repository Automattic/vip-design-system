/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

export interface DropdownSeparatorProps {
	className?: string;
}

export const styles = {
	height: '1px',
	backgroundColor: 'border.2', // Design token for #e3e0df
	paddingLeft: 'space.5', // 24px horizontal padding (px-6)
	paddingRight: 'space.5', // 24px horizontal padding (px-6)
	my: 0, // Remove vertical margin since we're using horizontal padding
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
