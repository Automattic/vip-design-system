/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import * as Form from '../NewForm';

export default {
	title: 'Form/Textarea',
	argTypes: {
		placeholder: {
			type: { name: 'string', required: false },
			control: { type: 'text' },
		},
		label: {
			type: { name: 'string', required: false },
			control: { type: 'text' },
		},
	},
};

const DefaultComponent = () => (
	<Form.Root>
		<Form.Textarea forLabel="my-text-area" rows="5" label="Regular textarea" />

		<hr sx={ { my: 4 } } />

		<Form.Textarea
			forLabel="my-text-area-error"
			rows="5"
			label="Error textarea"
			errorMessage="Please type numeric characters only"
			required
			hasError
		/>
	</Form.Root>
);

export const Default = DefaultComponent.bind( {} );
Default.args = {};
