/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Flex } from '..';

const Tabs = ( { sx, ...props } ) => (
	<Flex
		sx={{
			borderBottom: '1px solid',
			borderColor: 'border',
			listStyleType: 'none',
			margin: 0,
			padding: 0,
			...sx,
		}}
		{...props}
	/>
);

Tabs.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
};

export { Tabs };
