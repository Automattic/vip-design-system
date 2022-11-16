/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

const styles = {
	cursor: 'pointer',
	background: 'none',
	mr: 3,
	fontSize: 2,
	px: 0,
	pb: 3,
	border: 'none',
	color: 'heading',
	'&[data-state="active"]': {
		color: 'link',
		fontWeight: 'regular',
		boxShadow: theme => `inset 0 -1px 0 0 ${ theme.colors.link }, 0 1px 0 0 ${ theme.colors.link }`,
	},
	'&:disabled': {
		color: 'muted',
	},
	':hover': { fontWeight: 'regular', color: 'heading' },
	'&:focus': theme => theme.outline,
	'&:focus-visible': theme => theme.outline,
};

const TabsTrigger = React.forwardRef( ( { value, disabled = false, sx, children }, forwardRef ) => (
	<TabsPrimitive.TabsTrigger
		className={ classNames( 'vip-tabs-trigger', `vip-tabs-trigger-${ value }` ) }
		value={ value }
		disabled={ disabled }
		sx={ {
			...styles,
			...sx,
		} }
		ref={ forwardRef }
	>
		{ children }
	</TabsPrimitive.TabsTrigger>
) );

TabsTrigger.propTypes = {
	sx: PropTypes.object,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

TabsTrigger.displayName = 'TabsTrigger';
export { TabsTrigger };
