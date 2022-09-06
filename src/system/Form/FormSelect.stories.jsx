/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Form } from '.';

export default {
	title: 'Form/Select',
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

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const Default = args => <Form.Select id="form-select" label="Label" { ...args } />;

export const Primary = Default.bind( {} );
Primary.args = {
	placeholder: '- Select -',
	options: options,
};

export const WithGroup = Default.bind( {} );
WithGroup.args = {
	options: [
		{
			label: 'Group name',
			options: options,
		},
	],
};
