import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Utility Styles/Flow',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['flow'] +
					'\n\nApply `.flow` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'flow', 'the Flow React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('flow', 'css'),
	args: {},
	render: (args) => (
		<div className="flow" {...cssAttributes(args)}>
			<h2 className="type-heading-3">Release notes</h2>
			<p>Flow spaces direct siblings while keeping normal document layout.</p>
			<p>Use it for prose, lists, and other content with a natural reading order.</p>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

/** The nested Flow starts with its own default spacing. */
export const NestedFlow: Story = {
	render: () => (
		<div className="flow" data-flow-space="8">
			<p>Outer content</p>
			<div className="box flow">
				<p>Nested content</p>
				<p>This gap uses the nested Flow default.</p>
			</div>
			<p>Outer content continues.</p>
		</div>
	),
};
