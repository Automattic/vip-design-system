/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import { NewDialog, Box, Flex, Button } from '..';

const NewConfirmationDialogContent = ( {
	label = 'Confirm',
	onConfirm,
	onClose,
	className = null,
} ) => (
	<Box className={ classNames( 'vip-confirmation-dialog-component', className ) }>
		<Flex sx={ { justifyContent: 'flex-end', mt: 4 } }>
			<Button variant="secondary" sx={ { mr: 2 } } onClick={ onClose }>
				Cancel
			</Button>
			<NewDialog.Close>
				<Button
					variant="danger"
					onClick={ () => {
						onConfirm();
						onClose();
					} }
				>
					{ label }
				</Button>
			</NewDialog.Close>
		</Flex>
	</Box>
);

NewConfirmationDialogContent.propTypes = {
	body: PropTypes.node,
	label: PropTypes.string,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	className: PropTypes.any,
};

const NewConfirmationDialog = ( {
	trigger,
	onConfirm,
	needsConfirm = true,
	label,
	title,
	body = '',
} ) => {
	const [ open, setOpen ] = React.useState( false );
	const directTrigger = React.cloneElement( trigger, { onClick: onConfirm } );

	if ( ! needsConfirm ) {
		return directTrigger;
	}

	return (
		<NewDialog.Root
			open={ open }
			onOpenChange={ setOpen }
			sx={ { maxWidth: 680 } }
			title={ title }
			description={ ( body = '' ) }
			content={
				<NewConfirmationDialogContent
					onClose={ () => setOpen( false ) }
					onConfirm={ onConfirm }
					body={ body }
					label={ label }
				/>
			}
			trigger={ trigger }
		/>
	);
};

NewConfirmationDialog.propTypes = {
	needsConfirm: PropTypes.bool,
	trigger: PropTypes.node,
	onConfirm: PropTypes.func,
	title: PropTypes.node,
	body: PropTypes.node,
	label: PropTypes.node,
};

export { NewConfirmationDialog };
