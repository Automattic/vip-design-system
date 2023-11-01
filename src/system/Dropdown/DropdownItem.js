/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
	paddingLeft: 4,
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

export const DropdownItem = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuItem
		className={ classNames( 'vip-dropdown-menu-item', className ) }
		ref={ forwardRef }
		sx={ styles }
		{ ...props }
	/>
) );

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
	className: PropTypes.string,
};

export const DropdownCheckboxItem = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.CheckboxItem
		className={ classNames( 'vip-dropdown-checkbox-item', className ) }
		ref={ forwardRef }
		sx={ styles }
		{ ...props }
	/>
) );

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

DropdownCheckboxItem.propTypes = {
	className: PropTypes.string,
};

export const DropdownRadioItem = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.RadioItem
		className={ classNames( 'vip-dropdown-radio-item', className ) }
		ref={ forwardRef }
		sx={ styles }
		{ ...props }
	/>
) );

DropdownRadioItem.displayName = 'DropdownRadioItem';

DropdownRadioItem.propTypes = {
	className: PropTypes.string,
};

export const DropdownSubTrigger = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.SubTrigger
		className={ classNames( 'vip-dropdown-sub-trigger', className ) }
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

DropdownSubTrigger.propTypes = {
	className: PropTypes.string,
};
