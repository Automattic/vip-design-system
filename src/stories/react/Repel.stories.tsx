import type { Meta, StoryObj } from '@storybook/react';
import { Repel } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Repel',
	component: Repel,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('repel', descriptions['repel']) },
		},
	},
	argTypes: { ...configurationControls('repel', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Repel {...args}>
			<strong>Deployment</strong>
			<span className="badge type-support-label-xs" data-badge-variant="success">
				Published
			</span>
		</Repel>
	),
} satisfies Meta<typeof Repel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
