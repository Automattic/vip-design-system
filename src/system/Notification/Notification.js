/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdCheckCircle, MdClose, MdError } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box, Button, Card, Flex, Heading, Text } from '../';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';

const Notification = ( { title, body, status = 'success', onClose, prefix = 'Alert' } ) => (
	<Card
		className="vip-notification-component"
		sx={{
			boxShadow: 'medium',
			width: 320,
			position: 'relative',
			variant: `notification.${ status }`,
		}}
	>
		<div role="alert">
			<ScreenReaderText>
				{prefix}, {title} {body && `, ${ body }`}
			</ScreenReaderText>
		</div>

		<Button
			onClick={onClose}
			variant="icon"
			sx={{ color: 'muted', position: 'absolute', top: 2, right: 2 }}
		>
			<ScreenReaderText>Close notification</ScreenReaderText>

			<MdClose aria-hidden="true" />
		</Button>

		<Flex sx={{ alignItems: 'center' }} aria-hidden="true">
			{status === 'error' ? (
				<MdError sx={{ color: 'error', flex: '0 0 auto' }} />
			) : (
				<MdCheckCircle sx={{ color: 'success', flex: '0 0 auto' }} />
			)}
			<Box sx={{ flex: '1 1 auto', ml: 3 }}>
				<Heading variant="h4" sx={{ mb: 0 }}>
					{title}
				</Heading>
				{body && <Text sx={{ mb: 0, mt: 1 }}>{body}</Text>}
			</Box>
		</Flex>
	</Card>
);

Notification.propTypes = {
	title: PropTypes.node,
	prefix: PropTypes.string,
	body: PropTypes.node,
	status: PropTypes.string,
	onClose: PropTypes.func,
};

export { Notification };
