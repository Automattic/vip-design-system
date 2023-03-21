/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import MdError from '~icons/mdi/error';
import MdClose from '~icons/mdi/close';
import MdCheckCircle from '~icons/mdi/check-circle';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Box, Card, Flex, Text, Button } from '../';
import ScreenReaderText from '../ScreenReaderText';

const Notification = React.forwardRef(
	( { title, body, status = 'success', onClose }, forwardRef ) => (
		<Card
			role="alert"
			className="vip-notification-component"
			sx={ {
				boxShadow: 'medium',
				width: 320,
				position: 'relative',
				variant: `notification.${ status }`,
			} }
			ref={ forwardRef }
		>
			<ScreenReaderText>Alert,</ScreenReaderText>

			<Flex sx={ { alignItems: 'center' } }>
				{ status === 'error' ? (
					<MdError sx={ { color: 'error', flex: '0 0 auto' } } aria-hidden="true" />
				) : (
					<MdCheckCircle sx={ { color: 'success', flex: '0 0 auto' } } aria-hidden="true" />
				) }
				<Box sx={ { flex: '1 1 auto', ml: 3 } }>
					<p sx={ { my: 0, color: 'heading', fontWeight: 'bold' } }>{ title }</p>
					{ body && <Text sx={ { mb: 0, mt: 1 } }>{ body }</Text> }
				</Box>
			</Flex>

			{ onClose && (
				<Button
					onClick={ onClose }
					variant="icon"
					sx={ { color: 'muted', position: 'absolute', top: 2, right: 2 } }
					aria-hidden="true"
				>
					<MdClose />
				</Button>
			) }
		</Card>
	)
);

Notification.displayName = 'Notification';

Notification.propTypes = {
	title: PropTypes.node,
	body: PropTypes.node,
	status: PropTypes.string,
	onClose: PropTypes.func,
};

export { Notification };
