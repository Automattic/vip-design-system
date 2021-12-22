/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box, Heading, Text } from '..';

const BlankState = ( {
	body,
	cta,
	icon,
	image,
	imageAlt = 'Image representing the blank state',
	title,
} ) => {
	return (
		<Box sx={{ textAlign: 'center', padding: 5 }}>
			{icon ? icon : <img src={image} sx={{ mb: 3 }} alt={imageAlt} />}
			<Heading variant="h4">{title}</Heading>
			<Text>{body}</Text>
			<Box sx={{ mt: 3 }}>{cta}</Box>
		</Box>
	);
};

BlankState.propTypes = {
	body: PropTypes.node,
	cta: PropTypes.node,
	icon: PropTypes.node,
	image: PropTypes.oneOfType( [ PropTypes.object, PropTypes.string ] ),
	imageAlt: PropTypes.string,
	title: PropTypes.node,
};

export { BlankState };
