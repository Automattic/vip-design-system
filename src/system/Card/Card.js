/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

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
