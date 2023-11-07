/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const styles = {
	height: '1px',
	backgroundColor: 'borders.2',
	my: '5px',
};

export const DropdownSeparator = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuSeparator
		className={ classNames( 'vip-dropdown-menu-separator', className ) }
		ref={ forwardRef }
		sx={ styles }
		{ ...props }
	/>
) );

DropdownSeparator.displayName = 'DropdownSeparator';

DropdownSeparator.propTypes = {
	className: PropTypes.string,
};
