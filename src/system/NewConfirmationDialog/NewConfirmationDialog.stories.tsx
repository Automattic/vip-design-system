/**
 * Internal dependencies
 */
import React from 'react';

import { Box, NewConfirmationDialog, Button } from '..';

export default {
	title: 'Dialog/NewConfirmationDialog',
	component: NewConfirmationDialog,
};

const ConfirmationTrigger = <Button sx={ { mr: 3 } }>Click to answer</Button>;

export const Default = {
	args: {
		className: 'storybook-confirmation-dialog',
		title: 'Are you John Doe?',
		buttonVariant: 'danger',
		description: 'Please confirm that your name is John Doe.',
		trigger: ConfirmationTrigger,
		body: "A modal is used to perform more detailed actions that don't necessarily need the context behind.",
		needsConfirm: true,
	},
	render: args => {
		const [ answer, setAnswer ] = React.useState( '🤔' );
		return (
			<Box>
				<p>Confirm that your name is John doe?</p>
				<NewConfirmationDialog { ...args } onConfirm={ () => setAnswer( '👍' ) } />

				<p>Answer: { answer }</p>
			</Box>
		);
	},
};
