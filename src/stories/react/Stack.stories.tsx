import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Stack',
	component: Stack,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('stack', descriptions['stack']) },
		},
	},
	argTypes: { ...configurationControls('stack', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Stack {...args}>
			<div className="box" data-box-padding="4">
				First item
			</div>
			<div className="box" data-box-padding="4">
				Second item
			</div>
			<div className="box" data-box-padding="4">
				Third item
			</div>
		</Stack>
	),
} satisfies Meta<typeof Stack>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
