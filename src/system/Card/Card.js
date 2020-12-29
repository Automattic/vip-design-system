/** @jsx jsx */
/**
 * External dependencies
 */
import React from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box } from '..';

const Card = React.forwardRef( ( { variant = 'primary', ...props }, ref ) => (
	<Box
		{ ...props }
		ref={ ref }
		sx={ {
			// pass variant prop to sx
			variant: `cards.${ variant }`,
			overflow: 'hidden',
		} }
	/>
) );

Card.propTypes = {
	variant: PropTypes.string,
};

export { Card };
