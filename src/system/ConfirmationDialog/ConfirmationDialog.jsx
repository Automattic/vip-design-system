/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */
import { Dialog, Box, Heading, Text, Flex, Button } from '../';

const ConfirmationDialogContent = ( {
	title,
	body,
	onClose,
	label = 'Confirm',
	onConfirm,
	className = null,
} ) => (
	<Box p={ 4 } className={ classNames( 'vip-confirmation-dialog-component', className ) }>
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

export { ConfirmationDialog, ConfirmationDialogContent };
