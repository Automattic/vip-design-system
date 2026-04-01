/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import * as TabsPrimitive from '@radix-ui/react-tabs';
import PropTypes from 'prop-types';

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

TabsList.propTypes = {
	/** Accessible label for the tab list, used as the `aria-label` attribute. */
	title: PropTypes.string.isRequired,
	/** The TabsTrigger elements to render inside the list. */
	children: PropTypes.node.isRequired,
};

export { TabsList };
