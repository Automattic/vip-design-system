/** @jsxImportSource theme-ui */
import React from 'react';
import { Form, Label } from '..';

export default {
	title: 'Form/Label',
	component: Label,
	parameters: { docs: { source: { type: 'auto' } } },
	argTypes: {
		children: {
			control: 'text',
			defaultValue: 'Label text',
			description: 'The label content',
		},
		required: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether to show the required asterisk',
		},
		clickable: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the label should have pointer cursor',
		},
		sx: {
			control: 'object',
			description: 'Theme UI sx-style overrides',
		},
		as: {
			control: 'select',
			options: [ 'label', 'span', 'div' ],
			defaultValue: 'label',
			description: 'The HTML element to render as',
		},
	},
};

const Template = args => (
	<Form.Root>
		<Label { ...args }>{ args.children }</Label>
	</Form.Root>
);

export const Default = Template.bind( {} );
Default.args = {
	children: 'Label text',
};

export const Required = Template.bind( {} );
Required.args = {
	children: 'Label text',
	required: true,
};
