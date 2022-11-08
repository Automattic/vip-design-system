/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import * as TabsPrimitive from '@radix-ui/react-tabs';

/**
 * Internal dependencies
 */

const StyledTabsList = props => (
	<TabsPrimitive.List
		sx={ {
			borderBottom: '1px solid',
			borderColor: 'border',
			display: 'flex',
		} }
		{ ...props }
	/>
);

const TabsList = ( { sx, ...props } ) => <StyledTabsList { ...props } />;

TabsList.propTypes = {
	sx: PropTypes.object,
};

export { TabsList };
