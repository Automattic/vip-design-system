/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import { Dialog, Box, Heading, Text, Flex, Button } from '../';

const ConfirmationDialogContent = ( { title, body, onClose, label = 'Confirm', onConfirm } ) => (
	<Box p={ 4 }>
		<Heading variant="h3" sx={ { mb: 2 } }>
			{ title }
		</Heading>
		<Text>{ body }</Text>
		<Flex sx={ { justifyContent: 'flex-end', mt: 4 } }>
			<Button variant="text" sx={ { mr: 2 } } onClick={ onClose }>
				Cancel
			</Button>
			<Button
				variant="danger"
				onClick={ () => {
					onConfirm();
					onClose();
				} }
			>
				{ label }
			</Button>
		</Flex>
	</Box>
);

ConfirmationDialogContent.propTypes = {
	title: PropTypes.node,
	body: PropTypes.node,
	label: PropTypes.string,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
};

const ConfirmationDialog = ( { trigger, onConfirm, needsConfirm = true, ...props } ) => {
	const directTrigger = React.cloneElement( trigger, { onClick: onConfirm } );

	if ( ! needsConfirm ) {
		return directTrigger;
	}

	return (
		<Dialog
			variant="modal"
			sx={ { maxWidth: 680 } }
			content={ ( { onClose } ) => (
				<ConfirmationDialogContent onClose={ onClose } onConfirm={ onConfirm } { ...props } />
			) }
			trigger={ trigger }
		/>
	);
};

ConfirmationDialog.propTypes = {
	needsConfirm: PropTypes.bool,
	trigger: PropTypes.node,
	onConfirm: PropTypes.func,
};

export { ConfirmationDialog, ConfirmationDialogContent };
