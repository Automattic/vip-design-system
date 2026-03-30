/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Input } from './Input';
import { Form } from '..';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

type Story = StoryObj< typeof Input >;

export default {
	title: 'Form/Input',
	component: Input,
};

export const Primary: Story = {
	args: {
		label: 'Input label',
		forLabel: 'input-primary',
		placeholder: 'Your input here...',
		hasError: false,
		required: false,
	},
};

export const Default: Story = {
	render: () => (
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
			<Form.Input forLabel="input-readonly" readOnly value="This is a readonly input" />
		</Form.Root>
	),
};
