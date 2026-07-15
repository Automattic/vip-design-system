/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames from 'classnames';
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

Tabs.displayName = 'Tabs';

export { Tabs };
