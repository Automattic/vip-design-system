/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { MdCheckCircle, MdClose, MdError } from 'react-icons/md';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box, Card, Flex, Text, Button } from '../';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';

const Notification = ( { title, body, status = 'success', onClose } ) =>(
	<Card
		role="alert"
		className="vip-notification-component"
		sx={{
			boxShadow: 'medium',
			width: 320,
			position: 'relative',
			variant: `notification.${ status }`,
		}}
	>
		<ScreenReaderText>Alert,</ScreenReaderText>
		<Flex sx={{ alignItems: 'center' }}>
			{status === 'error' ? (
				<MdError sx={{ color: 'error', flex: '0 0 auto' }} aria-hidden="true" />
			) : (
				<MdCheckCircle sx={{ color: 'success', flex: '0 0 auto' }} aria-hidden="true" />
			)}
			<Box sx={{ flex: '1 1 auto', ml: 3 }}>
				<p sx={{ my: 0, color: 'heading', fontWeight: 'bold' }}>
					{title}
				</p>
				{body && <Text sx={{ mb: 0, mt: 1 }}>{body}</Text>}
			</Box>
		</Flex>

		{ onClose && (
			<Button
				onClick={onClose}
				variant="icon"
				sx={{ color: 'muted', position: 'absolute', top: 2, right: 2 }}
				aria-hidden="true"
			>
				<MdClose />
			</Button>
		) }
	</Card>
);

Notification.propTypes = {
	title: PropTypes.node,
	body: PropTypes.node,
	status: PropTypes.string,
	onClose: PropTypes.func,
};

export { Notification };
