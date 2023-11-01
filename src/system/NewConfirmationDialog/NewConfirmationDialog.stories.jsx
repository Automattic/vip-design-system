/**
 * Internal dependencies
 */
import React from 'react';
import { Box, NewConfirmationDialog, Button } from '..';

export default {
	title: 'Dialog/NewConfirmationDialog',
	component: NewConfirmationDialog,
};

const ConfirmationTrigger = <Button sx={ { mr: 4 } }>Click to answer</Button>;

export const Default = () => {
	const [ answer, setAnswer ] = React.useState( '🤔' );
	return (
		<Box>
			<p>Confirm that your name is John doe?</p>
			<NewConfirmationDialog
				className="storybook-confirmation-dialog"
				title={ 'Are you John Doe?' }
				buttonVariant="danger"
				description={ 'Please confirm that your name is John Doe.' }
				trigger={ ConfirmationTrigger }
				body="A modal is used to perform more detailed actions that don&lsquo;t necessarily need the context
					behind."
				onConfirm={ () => setAnswer( '👍' ) }
				needsConfirm={ true }
			/>

			<p>Answer: { answer }</p>
		</Box>
	);
};
