/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

const Avatar = ( { size = 32, src = null, ...props } ) => (
	<img
		src={src}
		sx={{
			borderRadius: 9999,
			height: size,
			width: size,
			border: '2px solid',
			borderColor: 'primary',
			display: 'block',
		}}
		{...props}
	/>
);

Avatar.propTypes = {
	size: PropTypes.number,
	src: PropTypes.string,
};

export { Avatar };
