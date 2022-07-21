/** @jsxImportSource theme-ui */

/**
/**
 * Internal dependencies
 */
import { Button, Text, Input, Label } from '../../system';
import ScreenReaderText from '../ScreenReaderText/ScreenReaderText';
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

export const AutoOpen = () => (
	<>
		<Text sx={ { fontSize: 3, mb: 3 } }>Auto Opens when rendered. Press escape to close it.</Text>
		<NewDialog
			{ ...defaultProps }
			defaultOpen={ true }
			trigger={ <ScreenReaderText>hey</ScreenReaderText> }
		/>
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
			content={
				<div>
					<h3>My Custom Content</h3>

					<form>
						<Label htmlFor="username">User name</Label>
						<Input type="text" name="username" id="username" />
						<Button type="submit">Submit</Button>
					</form>

					<h3>Continue here</h3>

					<p>This is an example.</p>
				</div>
			}
		/>
	</>
);
export const CustomStyling = () => (
	<>
		<Text sx={ { fontSize: 3, mb: 3 } }>Custom Styling on Dialog Content</Text>

		<NewDialog
			{ ...defaultProps }
			defaultOpen
			trigger={ <Button>Trigger Dialog</Button> }
			title="Custom dialog title"
			style={ {
				background: theme => `${ theme.colors.primary }`,
				padding: 5,
				borderRadius: 20,
				h2: { fontSize: 4, color: theme => `${ theme.colors.text }` },
				h3: { fontSize: 3, color: theme => `${ theme.colors.heading }` },
				p: { color: 'white' },
				'button[type="button"]:focus': { outlineColor: 'white', color: 'white' },
			} }
			content={
				<div>
					<h3>This is Read because it is Custom</h3>

					<p>This Dialog is styled using the `sx` property.</p>
				</div>
			}
		/>
	</>
);
