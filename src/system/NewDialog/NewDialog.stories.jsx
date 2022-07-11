/**
/**
 * Internal dependencies
 */
import { Button, Text } from '../../system';
import { NewDialog } from './NewDialog';

export default {
	title: 'NewDialog',
	component: NewDialog,
};

const defaultProps = {
	title: 'User settings',
	description: 'Use this form to manage your settings',
};

export const Default = () => (
	<>
		<Text sx={ { fontSize: 3, mb: 3 } }>
			Regular Dialog where the title and description are built-in and the content is provided by the
			user.
		</Text>
		<NewDialog { ...defaultProps } trigger={ <Button>Trigger Dialog</Button> } />
	</>
);

export const HiddenHeadings = () => (
	<>
		<Text sx={ { fontSize: 3, mb: 3 } }>
			Title and description are hidden, but still announced using a screen reader. Activate
			VoiceOver or any similar screen reader to listen to: Custom dialog title, Description of the
			dialog content.
		</Text>

		<NewDialog
			{ ...defaultProps }
			trigger={ <Button>Trigger Dialog</Button> }
			title="Custom dialog title"
			showHeading={ false }
			content={ <div>My Custom Content</div> }
		/>
	</>
);
