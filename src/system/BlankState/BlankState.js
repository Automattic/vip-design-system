/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Card, Heading, Text } from '..';

const BlankState = ( { image, title, body, cta } ) => {
	return (
		<Card variant="secondary" sx={{ textAlign: 'center', padding: 5 }}>
			<img src={image} sx={{ mb: 3 }} />
			<Heading variant="h4">{title}</Heading>
			<Text>{body}</Text>
			{cta}
		</Card>
	);
};

BlankState.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	body: PropTypes.string,
	cta: PropTypes.node,
};

export { BlankState };
