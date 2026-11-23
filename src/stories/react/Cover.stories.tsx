import type { Meta, StoryObj } from '@storybook/react';
import { Cover } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Cover',
	component: Cover,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('cover', descriptions['cover']) },
		},
	},
	argTypes: { ...configurationControls('cover', 'react'), ...renderControls },
	args: { minHeight: '20rem' },
	render: (args) => (
		<Cover {...args}>
			<header>Deployment overview</header>
			<div className="flow" data-flow-space="4">
				<h2 className="type-heading-3">Ready to publish</h2>
				<p>The main content stays centered.</p>
			</div>
			<footer>Updated just now</footer>
		</Cover>
	),
} satisfies Meta<typeof Cover>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
