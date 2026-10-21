import type { Meta, StoryObj } from '@storybook/react';
import { Cluster } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Cluster',
	component: Cluster,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('cluster', descriptions['cluster']) },
		},
	},
	argTypes: { ...configurationControls('cluster', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Cluster {...args}>
			<div className="box" data-box-padding="4">
				First item
			</div>
			<div className="box" data-box-padding="4">
				Second item
			</div>
			<div className="box" data-box-padding="4">
				Third item
			</div>
		</Cluster>
	),
} satisfies Meta<typeof Cluster>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
