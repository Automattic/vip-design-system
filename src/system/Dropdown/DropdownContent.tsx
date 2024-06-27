/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

export interface DropdownContentProps {
	className?: string;
}

export const styles = {
	minWidth: 220,
	borderRadius: 2,
	backgroundColor: 'background',
	boxShadow: 'high',
	px: 2,
	py: 1,
};

export const DropdownContent = React.forwardRef< HTMLDivElement, DropdownContentProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuContent
			className={ classNames( 'vip-dropdown-menu-content', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownContent.displayName = 'DropdownContent';

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
