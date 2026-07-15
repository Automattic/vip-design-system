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

export interface TabsContentProps {
	/** Additional CSS class name(s) to apply to the content panel. */
	className?: Argument;
	/** Unique identifier that associates this content panel with a TabsTrigger. */
	value: string;
	/** The content to display when this tab is active. */
	children: React.ReactNode;
}

/**
 * TabsContent — Panel that displays when its associated tab trigger is active.
 */
const TabsContent = ( { value, children, className = null }: TabsContentProps ) => (
	<TabsPrimitive.Content
		className={ classNames( 'vip-tabs-content', `vip-tabs-content-${ value }`, className ) }
		value={ value }
		sx={ {
			mt: 4,
		} }
	>
		{ children }
	</TabsPrimitive.Content>
);

export { TabsContent };
