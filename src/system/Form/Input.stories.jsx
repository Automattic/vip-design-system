/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Form } from '..';
import { Button } from '../Button';
import { MdContentCopy } from 'react-icons/md';

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
	</Form.Root>
);

export const WithFlexComponent = () => (
	<Form.Root>
		<Form.Input
			placeholder="Your input here..."
			label="Always add a label to inputs"
			forLabel="input-simple"
			flexComponent={ {
				display: 'flex',
				component: (
					<Button sx={ { height: '40px' } } aria-label="copy">
						<MdContentCopy />
					</Button>
				),
			} }
			errorMessage="Please type numeric characters only"
			hasError
		/>
	</Form.Root>
);
