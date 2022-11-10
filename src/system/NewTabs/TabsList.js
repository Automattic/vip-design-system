/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Internal dependencies
 */

const TabsList = ( { children, title, sx } ) => (
	<TabsPrimitive.List
		sx={ {
			borderBottom: '1px solid',
			borderColor: 'border',
			display: 'flex',
			...sx,
		} }
		aria-label={ title }
	>
		{ children }
	</TabsPrimitive.List>
);

TabsList.propTypes = {
	sx: PropTypes.object,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export { TabsList };
