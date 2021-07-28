/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
 import { Text } from '../';

const Badge = ( { variant = 'blue', sx, ...props } ) => (
	<Text
		as="span"
		sx={ {
			fontSize: 0,
			padding: 0,
			bg: `${ variant }.10`,
			color: `${ variant }.90`,
			py: 1,
			verticalAlign: 'middle',
			px: 2,
			display: 'inline-block',
			borderRadius: 1,
			fontWeight: 'heading',
			...sx,
		} }
		{ ...props }
	/>
);

Badge.propTypes = {
	variant: PropTypes.string,
	sx: PropTypes.object,
};

export { Badge };
