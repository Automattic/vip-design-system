/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

/**
 * Internal dependencies
 */
import { Dialog, Box, Heading, Text, Flex, Button } from '../';

export interface ConfirmationDialogContentProps {
	/** The dialog title. */
	title?: ReactNode;
	/** The dialog body content. */
	body?: ReactNode;
	/** Callback invoked when the dialog closes. */
	onClose?: () => void;
	/**
	 * Text for the confirm button.
	 * @default 'Confirm'
	 */
	label?: string;
	/** Callback invoked when the user confirms. */
	onConfirm?: () => void;
	/** Additional CSS class name(s) applied to the content wrapper. */
	className?: Argument;
}

const ConfirmationDialogContent = ( {
	title,
	body,
	onClose,
	label = 'Confirm',
	onConfirm,
	className = null,
}: ConfirmationDialogContentProps ) => (
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
					onConfirm?.();
					onClose?.();
				} }
			>
				{ label }
			</Button>
		</Flex>
	</Box>
);

export interface ConfirmationDialogProps extends Omit< ConfirmationDialogContentProps, 'onClose' > {
	/** The element that triggers the dialog; cloned to attach the confirm handler. */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- trigger accepts any element; cloneElement injects an onClick handler.
	trigger: ReactElement< any >;
	/**
	 * Whether to show a confirmation step. When false, the trigger confirms directly.
	 * @default true
	 */
	needsConfirm?: boolean;
}

const ConfirmationDialog = ( {
	trigger,
	onConfirm,
	needsConfirm = true,
	...props
}: ConfirmationDialogProps ) => {
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
