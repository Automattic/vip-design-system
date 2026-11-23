import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid, Sidebar } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Sidebar',
	component: Sidebar,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('sidebar', descriptions['sidebar']) },
		},
	},
	argTypes: { ...configurationControls('sidebar', 'react'), ...renderControls },
	args: { width: '12rem' },
	render: (args) => {
		const sidebar = (
			<aside className="box" data-box-padding="4">
				Sidebar
			</aside>
		);
		const content = (
			<article className="box flow" data-box-padding="4" data-flow-space="4">
				<h2 className="type-heading-3">Main content</h2>
				<p>Content grows to fill the remaining space and wraps when it becomes too narrow.</p>
			</article>
		);
		return (
			<Sidebar {...args}>
				{args.position === 'end' ? content : sidebar}
				{args.position === 'end' ? sidebar : content}
			</Sidebar>
		);
	},
} satisfies Meta<typeof Sidebar>;
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

export const LayoutOptions: Story = {
	render: () => (
		<Sidebar position="start" width="12rem" contentMin="50%" gap={6}>
			<Box surface="layer-3" padding={4}>
				Sidebar
			</Box>
			<Grid columns={2} minItemSize="8rem" gap={4}>
				<Box padding={4}>First card</Box>
				<Box padding={4}>Second card</Box>
			</Grid>
		</Sidebar>
	),
};

/** A constrained parent demonstrates the layout’s intrinsic wrap behavior. */
export const NarrowContainer: Story = {
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '20rem' }}>
				<Story />
			</div>
		),
	],
};

/** Source order follows reading order; the last child is the sidebar. */
export const SidebarAtEnd: Story = {
	render: () => (
		<Sidebar position="end" width="12rem">
			<Box render={<article />}>Main content comes first.</Box>
			<Box render={<aside />}>Sidebar comes last.</Box>
		</Sidebar>
	),
};
