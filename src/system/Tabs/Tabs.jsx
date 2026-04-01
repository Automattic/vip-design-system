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

/**
 * Tabs — Root container for the tabbed interface.
 * Wraps Radix UI Tabs.Root and manages active tab state.
 */
const Tabs = React.forwardRef(
	(
		{
			children,
			onValueChange = undefined,
			defaultValue = undefined,
			value = undefined,
			className = null,
		},
		ref
	) => {
		return (
			<TabsPrimitive.Root
				ref={ ref }
				value={ value }
				defaultValue={ defaultValue }
				onValueChange={ onValueChange }
				className={ classNames( 'vip-tabs-component', className ) }
			>
				{ children }
			</TabsPrimitive.Root>
		);
	}
);

Tabs.propTypes = {
	/** Additional CSS class name(s) to apply to the root element. */
	className: PropTypes.any,
	/** The value of the tab that should be active when initially rendered. Use when you do not need to control the active tab. */
	defaultValue: PropTypes.node,
	/** The controlled value of the currently active tab. Use together with `onValueChange`. */
	value: PropTypes.node,
	/** Callback invoked when the active tab changes. Receives the new value as an argument. */
	onValueChange: PropTypes.func,
	/** The tab sub-components (TabsList, TabsTrigger, TabsContent). */
	children: PropTypes.node.isRequired,
};

Tabs.displayName = 'Tabs';

export { Tabs };
