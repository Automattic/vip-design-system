/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Internal dependencies
 */

/**
 * TabsList — Container for TabsTrigger elements. Renders as a horizontal list with a bottom border.
 */
const TabsList = ( { children, title, ...props } ) => (
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
