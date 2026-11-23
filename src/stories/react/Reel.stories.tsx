import type { Meta, StoryObj } from '@storybook/react';
import { Reel } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Reel',
	component: Reel,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('reel', descriptions['reel']) },
		},
	},
	argTypes: { ...configurationControls('reel', 'react'), ...renderControls },
	args: { itemInlineSize: '12rem' },
	render: (args) => (
		<Reel {...args} tabIndex={0} role="region" aria-label="Scrollable items">
			<div className="box" data-box-padding="4">
				First item
			</div>
			<div className="box" data-box-padding="4">
				Second item
			</div>
			<div className="box" data-box-padding="4">
				Third item
			</div>
			<div className="box" data-box-padding="4">
				Fourth item
			</div>
			<div className="box" data-box-padding="4">
				Fifth item
			</div>
			<div className="box" data-box-padding="4">
				Sixth item
			</div>
		</Reel>
	),
} satisfies Meta<typeof Reel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
