/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { useState } from 'react';

/**
/**
 * Internal dependencies
 */
import { Button, Text, Input, Label } from '../../system';
import ScreenReaderText from '../ScreenReaderText';
import * as NewDialog from '.';

export default {
	title: 'Dialog/NewDialog',
	component: NewDialog.Root,
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
		<NewDialog.Root { ...defaultProps } trigger={ <Button>Trigger Dialog</Button> } />
	</>
);

export const HiddenHeadings = () => (
	<>
		<Text sx={ { fontSize: 3, mb: 3 } }>
			Title and description are hidden, but still announced using a screen reader. Activate
			VoiceOver or any similar screen reader to listen to: Custom dialog title, Description of the
			dialog content.
		</Text>

		<NewDialog.Root
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

		<NewDialog.Root
			{ ...defaultProps }
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

export const CustomClose = () => (
	<>
		<Text sx={ { fontSize: 3, mb: 3 } }>
			This example shows how you can create a custom Close trigger to your dialog
		</Text>
		<NewDialog.Root
			{ ...defaultProps }
			trigger={ <Button>Trigger Dialog</Button> }
			content={
				<div>
					<NewDialog.Close>
						<Button>Close here instead</Button>
					</NewDialog.Close>
				</div>
			}
		/>
	</>
);

export const CustomStateManagement = () => {
	const [ open, setOpen ] = useState( false );
	return (
		<>
			<Text sx={ { fontSize: 3, mb: 3 } }>
				This example shows how you can create a custom state management. To achieve accessibility,
				you need to control the <strong>open</strong> state, but also keep consistency using the{ ' ' }
				<strong>onOpenChange</strong> attribute.
			</Text>

			<NewDialog.Root
				{ ...defaultProps }
				open={ open }
				onOpenChange={ status => {
					// eslint-disable-next-line no-console
					console.log( 'New status changed', status );

					setOpen( ! open );
				} }
				trigger={ <Button>Trigger Dialog</Button> }
				content={
					<div sx={ { mt: 2 } }>
						<NewDialog.Close>
							<Button>Close here instead</Button>
						</NewDialog.Close>
					</div>
				}
			/>
		</>
	);
};

export const CustomOnClose = () => {
	return (
		<>
			<Text sx={ { fontSize: 3, mb: 3 } }>
				This example shows how you can use the content as a function to use the onClose method (same
				behavior as the original Dialog component).
			</Text>

			<NewDialog.Root
				{ ...defaultProps }
				trigger={ <Button>Trigger Dialog</Button> }
				content={ ( { onClose } ) => (
					<div sx={ { mt: 2 } }>
						<Button onClick={ onClose }>Close here instead</Button>
					</div>
				) }
			/>
		</>
	);
};
