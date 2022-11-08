/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Internal dependencies
 */

const TabsList = ( { sx, ...props } ) => (
	<TabsPrimitive.List
		sx={ {
			borderBottom: '1px solid',
			borderColor: 'border',
			display: 'flex',
			...sx,
		} }
		{ ...props }
	/>
);

TabsList.propTypes = {
	sx: PropTypes.object,
	'aria-label': PropTypes.string.isRequired,
};

export { TabsList };
