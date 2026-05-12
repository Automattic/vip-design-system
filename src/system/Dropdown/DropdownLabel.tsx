/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

export interface DropdownLabelProps {
	/** Additional CSS class name applied to the label. */
	className?: string;
}

export const styles = {
	paddingLeft: 3,
	fontSize: 12,
	lineHeight: '25px',
	color: 'muted',
};

/**
 * A non-interactive label used to describe a group of items within a Dropdown menu.
 */
export const DropdownLabel = React.forwardRef< HTMLDivElement, DropdownLabelProps >(
	( { className, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuLabel
			className={ classNames( 'vip-dropdown-menu-label', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	)
);

DropdownLabel.displayName = 'DropdownLabel';
