/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box } from '..';

const Card = React.forwardRef(({ variant = 'primary', sx = {}, ...props }, ref) => (
	<Box
		ref={ref}
		sx={{
			// pass variant prop to sx
			variant: `cards.${variant}`,
			overflow: 'hidden',
			...sx,
		}}
		{...props}
	/>
));

Card.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
};

export { Card };
