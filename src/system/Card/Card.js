/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box } from '..';

const Card = ( { variant = 'primary', ...props } ) => (
	<Box
		{...props}
		sx={{
			// pass variant prop to sx
			variant: `cards.${ variant }`,
			overflow: 'hidden',
		}}
	/>
);

Card.propTypes = {
	variant: PropTypes.string,
};

export { Card };
