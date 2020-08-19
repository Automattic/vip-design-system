/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box, Text } from '..';

const Avatar = ( { size = 32, src = null, name = null, ...props } ) => (
	<Box
		sx={ {
			borderRadius: 9999,
			height: size,
			width: size,
			border: '2px solid',
			borderColor: 'primary',
			overflow: 'hidden',
			backgroundColor: 'brand.50',
			color: 'white',
			textAlign: 'center',
		} }
		{ ...props }
	>
		{ src ? (
			<img
				src={ src }
				alt={ name }
				sx={ {
					width: '100%',
					display: 'block',
				} }
			/>
		) : (
			<Text
				as="span"
				sx={ {
					color: 'white',
					fontWeight: 'bold',
					fontSize: 0,
					textTransform: 'uppercase',
				} }
			>
				{ name ? name.charAt( 0 ) : null }
			</Text>
		) }
	</Box>
);

Avatar.propTypes = {
	size: PropTypes.number,
	src: PropTypes.string,
	name: PropTypes.string,
};

export { Avatar };
