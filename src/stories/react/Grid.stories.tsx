import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Grid',
	component: Grid,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('grid', descriptions['grid']) },
		},
	},
	argTypes: { ...configurationControls('grid', 'react'), ...renderControls },
	args: { minItemSize: '8rem' },
	render: (args) => (
		<Grid {...args}>
			<div className="box" data-box-padding="4">
				First item
			</div>
			<div className="box" data-box-padding="4">
				Second item
			</div>
			<div className="box" data-box-padding="4">
				Third item
			</div>
		</Grid>
	),
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;
/** Drag the bottom-right edge to test behavior at different container widths. */
export const Playground: Story = {
	decorators: [
		(Story) => (
			<div
				style={{
					resize: 'horizontal',
					overflow: 'auto',
					width: '100%',
					minWidth: '16rem',
					maxWidth: '100%',
					paddingBottom: '1rem',
				}}
			>
				<Story />
			</div>
		),
	],
};
