import type { Meta, StoryObj } from '@storybook/react';
import { WithIcon } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/With Icon',
	component: WithIcon,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('with-icon', descriptions['with-icon']) },
		},
	},
	argTypes: { ...configurationControls('with-icon', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<WithIcon {...args}>
			<svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
				<path d="m9 16.2-4.2-4.2L3.4 13.4 9 19 21 7l-1.4-1.4z" />
			</svg>
			<span>Published</span>
		</WithIcon>
	),
} satisfies Meta<typeof WithIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
