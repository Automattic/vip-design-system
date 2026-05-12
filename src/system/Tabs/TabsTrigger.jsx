/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
		position: 'relative',
		'&::after': {
			position: 'absolute',
			bottom: 0,
			display: 'block',
			width: '100%',
			content: '""',
			height: '0.125rem',
			backgroundColor: 'link',
		},
	},
	'&:disabled': {
		color: 'muted',
	},
	':hover': { fontWeight: 'regular', color: 'heading' },
	'&:focus-visible': theme => theme.outline,
};

/**
 * TabsTrigger — A button that activates its associated TabsContent panel.
 */
const TabsTrigger = React.forwardRef(
	( { value, disabled = false, children, className = null }, forwardRef ) => (
		<TabsPrimitive.TabsTrigger
			className={ classNames( 'vip-tabs-trigger', `vip-tabs-trigger-${ value }`, className ) }
			value={ value }
			disabled={ disabled }
			sx={ {
				...styles,
			} }
			ref={ forwardRef }
		>
			{ children }
		</TabsPrimitive.TabsTrigger>
	)
);

TabsTrigger.propTypes = {
	/** Additional CSS class name(s) to apply to the trigger button. */
	className: PropTypes.string,
	/** Unique identifier that associates this trigger with a TabsContent panel. */
	value: PropTypes.string,
	/** Whether the tab trigger is disabled and cannot be activated. */
	disabled: PropTypes.bool,
	/** The label content rendered inside the trigger button. */
	children: PropTypes.node.isRequired,
};

TabsTrigger.displayName = 'TabsTrigger';
export { TabsTrigger };
