/** @jsxImportSource theme-ui */

import { Label } from '..';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta< typeof Label > = {
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
			description: 'Whether to show the required label',
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

export default meta;

type Story = StoryObj< typeof Label >;

export const Default: Story = {
	args: {
		children: 'Label text',
	},
};

export const Required: Story = {
	args: {
		children: 'Label text',
		required: true,
	},
};
