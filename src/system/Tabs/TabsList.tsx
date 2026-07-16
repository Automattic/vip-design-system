/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

/**
 * Internal dependencies
 */

export interface TabsListProps extends React.ComponentPropsWithoutRef< typeof TabsPrimitive.List > {
	/** Accessible label for the tab list, used as the `aria-label` attribute. */
	title: string;
	/** The TabsTrigger elements to render inside the list. */
	children: React.ReactNode;
}

/**
 * TabsList — Container for TabsTrigger elements. Renders as a horizontal list with a bottom border.
 */
const TabsList = ( { children, title, ...props }: TabsListProps ) => (
	<TabsPrimitive.List
		sx={ {
			borderBottom: '1px solid',
			borderColor: 'borders.2',
			display: 'flex',
		} }
		aria-label={ title }
		{ ...props }
	>
		{ children }
	</TabsPrimitive.List>
);

export { TabsList };
