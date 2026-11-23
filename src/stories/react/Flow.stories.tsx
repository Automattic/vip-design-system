import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flow } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Flow',
	component: Flow,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('flow', descriptions['flow']) },
		},
	},
	argTypes: { ...configurationControls('flow', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Flow {...args}>
			<h2 className="type-heading-3">Release notes</h2>
			<p>Flow spaces direct siblings while keeping normal document layout.</p>
			<p>Use it for prose, lists, and other content with a natural reading order.</p>
		</Flow>
	),
} satisfies Meta<typeof Flow>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

/** The nested Flow starts with its own default spacing. */
export const NestedFlow: Story = {
	render: () => (
		<Flow space={8}>
			<p>Outer content</p>
			<Box render={<Flow />}>
				<p>Nested content</p>
				<p>This gap uses the nested Flow default.</p>
			</Box>
			<p>Outer content continues.</p>
		</Flow>
	),
};
