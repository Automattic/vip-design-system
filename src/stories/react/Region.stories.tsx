import type { Meta, StoryObj } from '@storybook/react';
import { Flow, Region } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Region',
	component: Region,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('region', descriptions['region']) },
		},
	},
	argTypes: { ...configurationControls('region', 'react'), ...renderControls },
	args: { space: 6 },
	render: (args) => (
		<Region {...args} className="bg-layer-2">
			<div className="wrapper flow" data-flow-space="4">
				<h2 className="type-heading-3">A section of content</h2>
				<p>Region sets vertical space; Wrapper constrains the content width.</p>
			</div>
		</Region>
	),
} satisfies Meta<typeof Region>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

export const UtilityComposition: Story = {
	render: () => (
		<Region space={6} render={<Flow space={4} render={<article />} />}>
			<h2 className="type-heading-3">Release notes</h2>
			<p>Region sets block padding; Flow spaces the direct children.</p>
			<p>Both use the same numeric spacing presets as CSS.</p>
		</Region>
	),
};
