/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Flex } from '..';

const Tabs = ( { ...props } ) => (
	<Flex
		sx={{
			borderBottom: '2px solid',
			borderColor: 'border',
			listStyleType: 'none',
			margin: 0,
			padding: 0,
		}}
		{...props}
	/>
);

Tabs.propTypes = {
	variant: PropTypes.string,
};

export { Tabs };
