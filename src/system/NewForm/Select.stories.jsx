/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import * as NewForm from '.';

export default {
	title: 'NewForm/Select',
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

const Default = args => <NewForm.Select id="form-select" label="Label" { ...args } />;

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
