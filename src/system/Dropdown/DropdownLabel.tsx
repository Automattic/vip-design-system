/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

export interface DropdownLabelProps extends DropdownMenuPrimitive.DropdownMenuLabelProps {
	/** Additional CSS class name applied to the label. */
	className?: string;
	/** The content rendered inside the label. */
	children?: React.ReactNode;
	/** Theme UI style overrides applied to the label. */
	sx?: ThemeUIStyleObject;
}

export const styles: ThemeUIStyleObject = {
	paddingLeft: 3,
	fontSize: 12,
	lineHeight: '25px',
	color: 'muted',
};

/**
 * A non-interactive label used to describe a group of items within a Dropdown menu.
 */
export const DropdownLabel = React.forwardRef< HTMLDivElement, DropdownLabelProps >(
	( { className, sx = {}, ...props }, forwardRef ) => (
		<DropdownMenuPrimitive.DropdownMenuLabel
			className={ classNames( 'vip-dropdown-menu-label', className ) }
			ref={ forwardRef }
			sx={ { ...styles, ...sx } }
			{ ...props }
		/>
	)
);

DropdownLabel.displayName = 'DropdownLabel';
