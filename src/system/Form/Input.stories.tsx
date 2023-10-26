/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Form } from '..';

export default {
	title: 'Form/Input',
};

export const Default = () => (
	<Form.Root>
		<Form.Input
			placeholder="Your input here..."
			label="Always add a label to inputs"
			forLabel="input-simple"
		/>

		<hr sx={ { my: 4 } } />

		<Form.Input
			forLabel="input-with-error"
			label="Error Input"
			errorMessage="Please type numeric characters only"
			hasError
		/>

		<hr sx={ { my: 4 } } />

		<Form.Input forLabel="input-with-required" label="Required" required />

		<hr sx={ { my: 4 } } />

		<Form.Label htmlFor="input-with-custom-label">Custom Label outside the Input</Form.Label>
		<Form.Input forLabel="input-with-custom-label" required />

		<Form.Label htmlFor="input-readonly">Ready only input</Form.Label>
		<Form.Input forLabel="input-readonly" readOnly value="This is a readonly input" />
	</Form.Root>
);
