/** @jsxImportSource theme-ui */

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

export interface DropdownLabelProps {
	className?: string;
}

export const styles = {
	paddingLeft: 'space.5', // 24px (pl-6 equivalent)
	paddingRight: 'space.4', // 16px (pr-4 equivalent)
	paddingTop: 'space.1', // 4px (py-1 equivalent)
	paddingBottom: 'space.1', // 4px (py-1 equivalent)
	fontSize: 'fontSize.1', // 12px
	fontFamily: 'heading', // Aktiv Grotesk VF
	fontWeight: 'semiBold', // 600 weight
	lineHeight: 1.5,
	color: 'text.secondary', // #514e4d
	textTransform: 'uppercase' as const,
	letterSpacing: '0.6px', // TODO: map to design system
};

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
