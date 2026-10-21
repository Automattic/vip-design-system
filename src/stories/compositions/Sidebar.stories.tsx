import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Sidebar',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['sidebar'] +
					'\n\nApply `.sidebar` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'sidebar', 'the Sidebar React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('sidebar', 'css'),
	args: { 'data-sidebar-width': '12rem' },
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
			<div className="sidebar" {...cssAttributes(args)}>
				{args['data-position'] === 'end' ? content : sidebar}
				{args['data-position'] === 'end' ? sidebar : content}
			</div>
		);
	},
} satisfies Meta<CSSArgs>;
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
		<div className="sidebar" data-position="end" data-sidebar-width="12rem">
			<article className="box">Main content comes first.</article>
			<aside className="box">Sidebar comes last.</aside>
		</div>
	),
};
