/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Image } from 'theme-ui';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Box, Text } from '..';

const Avatar = ( {
	isVIP = false,
	name = null,
	size = 32,
	src = null,
	className = null,
	...props
} ) => (
	<Box
		sx={ {
			borderRadius: 9999,
			height: size + 2, // +2 to compensate padding on both sides
			width: size + 2, // +2 to compensate padding on both sides
			border: '2px solid',
			borderColor: isVIP ? 'primary' : 'transparent',
			overflow: 'hidden',
			backgroundColor: 'primary',
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white',
			padding: '1px',
			textAlign: 'center',
		} }
		className={ classNames( 'vip-avatar-component', className ) }
		aria-hidden="true"
		{ ...props }
	>
		{ src ? (
			<Image
				src={ src }
				alt={ `Avatar image from ${ name }` }
				sx={ {
					borderRadius: 9999,
					width: '100%',
					display: 'block',
				} }
			/>
		) : (
			<Text
				as="span"
				sx={ {
					color: 'white',
					mb: 0,
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
	isVIP: PropTypes.bool,
	size: PropTypes.number,
	src: PropTypes.string,
	name: PropTypes.string,
	className: PropTypes.any,
};

export { Avatar };
