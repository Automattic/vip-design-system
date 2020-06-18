/** @jsx jsx */
/**
 * External dependencies
 */
import { MdCheckCircle, MdClose } from 'react-icons/md';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Internal dependencies
 */
import { Box, Button, Card, Flex, Heading, Text } from '../';

const Notification = ( { title, body, status = 'success', onClose } ) => (
	<Card
		sx={ {
			boxShadow: 'medium',
			width: 320,
			position: 'relative',
			variant: `notification.${ status }`,
		} }
	>
		<Button
			onClick={ onClose }
			variant="icon"
			sx={ { color: 'muted', position: 'absolute', top: 2, right: 2 } }
		>
			<MdClose />
		</Button>
		<Flex sx={ { alignItems: 'center' } }>
			<MdCheckCircle sx={ { color: 'green.50', flex: '0 0 auto' } } />
			<Box sx={ { flex: '1 1 auto', ml: 3 } }>
				<Heading variant="h4">{ title }</Heading>
				{ body && <Text sx={ { mb: 0 } }>{ body }</Text> }
			</Box>
		</Flex>
	</Card>
);

Notification.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	status: PropTypes.string,
	onClose: PropTypes.func,
};

export { Notification };
