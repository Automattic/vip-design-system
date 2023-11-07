/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const styles = {
	minWidth: 220,
	borderRadius: 2,
	backgroundColor: 'background',
	boxShadow: 'high',
	px: 2,
	py: 1,
};

export const DropdownContent = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.DropdownMenuContent
		className={ classNames( 'vip-dropdown-menu-content', className ) }
		ref={ forwardRef }
		sx={ styles }
		{ ...props }
	/>
) );

DropdownContent.displayName = 'DropdownContent';

DropdownContent.propTypes = {
	className: PropTypes.string,
};

export const DropdownSubContent = React.forwardRef( ( { className, ...props }, forwardRef ) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.DropdownMenuSubContent
			className={ classNames( 'vip-dropdown-menu-sub-content', className ) }
			ref={ forwardRef }
			sx={ styles }
			{ ...props }
		/>
	</DropdownMenuPrimitive.Portal>
) );

DropdownSubContent.displayName = 'DropdownSubContent';

DropdownSubContent.propTypes = {
	className: PropTypes.string,
};
