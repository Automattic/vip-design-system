import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Box, Cluster, Stack } from '../../index';
import {
	configurationControls,
	renderControls,
	reactDescription,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'React Components/Box',
	component: Box,
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { type: 'dynamic' },
			description: { component: reactDescription('box', descriptions['box']) },
		},
	},
	argTypes: { ...configurationControls('box', 'react'), ...renderControls },
	args: {},
	render: (args) => (
		<Box {...args}>
			<p>A surface for related content.</p>
		</Box>
	),
} satisfies Meta<typeof Box>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

export const ComposedSurface: Story = {
	render: () => (
		<Box
			surface="layer-2"
			padding={6}
			render={<Stack gap={4} aria-label="Deployment status" render={<section />} />}
		>
			<h2 className="type-heading-3">Deployment</h2>
			<Cluster gap={3}>
				<Badge variant="success">Published</Badge>
				<Badge variant="info">Production</Badge>
			</Cluster>
			<p>The Box and Stack share a single section element.</p>
		</Box>
	),
};

export const NativeElement: Story = {
	render: () => (
		<Box surface="layer-2" padding={4} render={<a href="https://wpvip.com" />}>
			Visit WordPress VIP
		</Box>
	),
};

/** A render callback must forward the supplied props, including the merged ref. */
export const RenderCallback: Story = {
	// Runtime JSX serialization cannot preserve a callback's implementation.
	parameters: {
		docs: {
			source: {
				type: 'code',
				code: `<Box
  surface="layer-2"
  padding={4}
  render={(props) => <article {...props} />}
>
  An article rendered by a callback.
</Box>`,
			},
		},
	},
	render: () => (
		<Box surface="layer-2" padding={4} render={(props) => <article {...props} />}>
			An article rendered by a callback.
		</Box>
	),
};
