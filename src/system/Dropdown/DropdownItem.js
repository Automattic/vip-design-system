/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const styles = {
	unset: 'all',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'row',
	textAlign: 'left',
	height: 25,
	textDecoration: 'none',
	position: 'relative',
	m: 0,
	color: 'heading',
	px: 2,
	paddingLeft: 10,
	py: 1,
	'&:hover, &:focus': {
		backgroundColor: 'hover',
	},

	'&[data-disabled]': {
		color: 'muted',
		pointerEvents: 'none',
	},

	'&[data-highlighted]': {
		backgroundColor: 'hover',
		color: 'primary',
	},
};

export const DropdownItem = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuItem ref={ forwardRef } sx={ styles } { ...props } />
) );

DropdownItem.displayName = 'DropdownItem';

export const DropdownCheckboxItem = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.CheckboxItem ref={ forwardRef } sx={ styles } { ...props } />
) );

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

export const DropdownRadioItem = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.RadioItem ref={ forwardRef } sx={ styles } { ...props } />
) );

DropdownRadioItem.displayName = 'DropdownRadioItem';

export const DropdownSubTrigger = React.forwardRef( ( props, forwardRef ) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ forwardRef }
		sx={ {
			...styles,
			...{
				'&[data-state="open"]': {
					background: 'highlight',
					color: 'primary',
				},
			},
		} }
		{ ...props }
	/>
) );

DropdownSubTrigger.displayName = 'DropdownSubTrigger';
