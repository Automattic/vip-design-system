/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import * as NewDialog from '../NewDialog';

export interface NewConfirmationDialogContentProps {
	/**
	 * Text for the confirm button.
	 * @default 'Confirm'
	 */
	label?: string;
	/**
	 * Visual variant of the confirm button.
	 * @default 'danger'
	 */
	buttonVariant?: React.ComponentProps< typeof Button >[ 'variant' ];
	/** Callback invoked when the user confirms. */
	onConfirm?: () => void;
	/** Callback invoked when the dialog closes. */
	onClose?: () => void;
	/** Additional CSS class name(s) applied to the content wrapper. */
	className?: Argument;
	/**
	 * Whether the confirm button is disabled.
	 * @default false
	 */
	buttonDisabled?: boolean;
}

const NewConfirmationDialogContent = ( {
	label = 'Confirm',
	buttonVariant = 'danger',
	onConfirm,
	onClose,
	className = null,
	buttonDisabled = false,
}: NewConfirmationDialogContentProps ) => (
	<Box className={ classNames( 'vip-confirmation-dialog-component', className ) }>
		<Flex sx={ { justifyContent: 'flex-end', mt: 4 } }>
			<Button variant="ghost" sx={ { mr: 2 } } onClick={ onClose }>
				Cancel
			</Button>
			<NewDialog.Close>
				<Button
					variant={ buttonVariant }
					onClick={ () => {
						onConfirm?.();
						onClose?.();
					} }
					disabled={ buttonDisabled }
				>
					{ label }
				</Button>
			</NewDialog.Close>
		</Flex>
	</Box>
);

export interface NewConfirmationDialogProps
	extends Omit<
		React.ComponentProps< typeof NewDialog.Root >,
		'title' | 'description' | 'content' | 'trigger'
	> {
	/** The element that triggers the dialog; cloned to attach the confirm handler. */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- trigger accepts any element; cloneElement injects an onClick handler.
	trigger: ReactElement< any >;
	/** Callback invoked when the user confirms. */
	onConfirm?: () => void;
	/**
	 * Whether to show a confirmation step. When false, the trigger confirms directly.
	 * @default true
	 */
	needsConfirm?: boolean;
	/** Text for the confirm button. */
	label?: string;
	/** Visual variant of the confirm button. */
	buttonVariant?: React.ComponentProps< typeof Button >[ 'variant' ];
	/** The dialog title. */
	title?: ReactNode;
	/** The dialog body, rendered as the dialog description. */
	body?: string;
	/** Whether the confirm button is disabled. */
	buttonDisabled?: boolean;
}

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
}: NewConfirmationDialogProps ) => {
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
