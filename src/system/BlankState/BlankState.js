/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box, Heading, Text } from '..';

const BlankState = ({ image, icon, title, body, cta }) => {
	return (
		<Box sx={{ textAlign: 'center', padding: 5 }}>
			{icon ? icon : <img src={image} sx={{ mb: 3 }} alt="Icon representing the blank state" />}
			<Heading variant="h4">{title}</Heading>
			<Text>{body}</Text>
			<Box sx={{ mt: 3 }}>{cta}</Box>
		</Box>
	);
};

BlankState.propTypes = {
	image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
	icon: PropTypes.node,
	title: PropTypes.node,
	body: PropTypes.node,
	cta: PropTypes.node,
};

export { BlankState };
