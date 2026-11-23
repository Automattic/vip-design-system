import type { Meta, StoryObj } from '@storybook/react';
import { Wrapper } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Wrapper',
	component: Wrapper,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('wrapper', descriptions['wrapper']) },
		},
	},
	argTypes: { ...configurationControls('wrapper', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Wrapper {...args}>
			<div className="box" data-box-padding="4">
				Centered content, with breathing room at both edges.
			</div>
		</Wrapper>
	),
} satisfies Meta<typeof Wrapper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
