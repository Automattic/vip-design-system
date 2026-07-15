/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

/**
 * Internal dependencies
 */
import { NewDialog, Box, Flex, Button } from '..';

const NewConfirmationDialogContent = ( {
	label = 'Confirm',
	buttonVariant = 'danger',
	onConfirm,
	onClose,
	className = null,
	buttonDisabled = false,
} ) => (
	<Box className={ classNames( 'vip-confirmation-dialog-component', className ) }>
		<Flex sx={ { justifyContent: 'flex-end', mt: 4 } }>
			<Button variant="ghost" sx={ { mr: 2 } } onClick={ onClose }>
				Cancel
			</Button>
			<NewDialog.Close>
				<Button
					variant={ buttonVariant }
					onClick={ () => {
						onConfirm();
						onClose();
					} }
					disabled={ buttonDisabled }
				>
					{ label }
				</Button>
			</NewDialog.Close>
		</Flex>
	</Box>
);

const NewConfirmationDialog = ( {
	trigger,
	onConfirm,
	needsConfirm = true,
	label,
	buttonVariant,
	title,
	body = '',
	buttonDisabled = false,
	...props
} ) => {
	const directTrigger = React.cloneElement( trigger, { onClick: onConfirm } );

	if ( ! needsConfirm ) {
		return directTrigger;
	}

	return (
		<NewDialog.Root
			sx={ { maxWidth: 680 } }
			title={ title }
			description={ body }
			content={ ( { onClose } ) => (
				<NewConfirmationDialogContent
					onClose={ onClose }
					onConfirm={ onConfirm }
					body={ body }
					label={ label }
					buttonVariant={ buttonVariant }
					buttonDisabled={ buttonDisabled }
				/>
			) }
			trigger={ trigger }
			{ ...props }
		/>
	);
};

export { NewConfirmationDialog };
