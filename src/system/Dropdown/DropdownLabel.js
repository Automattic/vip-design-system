/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const styles = {
	paddingLeft: 3,
	fontSize: 12,
	lineHeight: '25px',
	color: 'muted',
};

export const DropdownLabel = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuLabel
		className={ classNames( 'vip-dropdown-menu-label', className ) }
		ref={ forwardRef }
		sx={ styles }
		{ ...props }
	/>
) );

DropdownLabel.displayName = 'DropdownLabel';

DropdownLabel.propTypes = {
	className: PropTypes.string,
};
