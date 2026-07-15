/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import classNames, { Argument } from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */

export interface TabsProps {
	/** Additional CSS class name(s) to apply to the root element. */
	className?: Argument;
	/** The value of the tab that should be active when initially rendered. Use when you do not need to control the active tab. */
	defaultValue?: string;
	/** The controlled value of the currently active tab. Use together with `onValueChange`. */
	value?: string;
	/** Callback invoked when the active tab changes. Receives the new value as an argument. */
	onValueChange?: ( value: string ) => void;
	/** The tab sub-components (TabsList, TabsTrigger, TabsContent). */
	children: React.ReactNode;
}

/**
 * Tabs — Root container for the tabbed interface.
 * Wraps Radix UI Tabs.Root and manages active tab state.
 */
const Tabs = React.forwardRef< HTMLDivElement, TabsProps >(
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
