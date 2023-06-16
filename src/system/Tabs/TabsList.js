/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Internal dependencies
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
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export { TabsList };
