import { landscape } from '../../../.storybook/helpers/assets';
import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Frame',
	component: Frame,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('frame', descriptions['frame']) },
		},
	},
	argTypes: { ...configurationControls('frame', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Frame {...args}>
			<img src={landscape} alt="Illustration of a mountain landscape at sunset" />
		</Frame>
	),
} satisfies Meta<typeof Frame>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
