import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Box',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['box'] +
					'\n\nApply `.box` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'box', 'the Box React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('box', 'css'),
	args: {},
	render: (args) => (
		<div className="box" {...cssAttributes(args)}>
			<p>A surface for related content.</p>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

/** Box defines the surface; Stack arranges its direct children. */
export const ComposedSurface: Story = {
	render: () => (
		<section
			className="box stack"
			data-box-surface="layer-2"
			data-box-padding="6"
			data-stack-gap="4"
		>
			<h2 className="type-heading-3">Deployment</h2>
			<span className="badge type-support-label-xs" data-badge-variant="success">
				Published
			</span>
			<p>Two composition classes on one element.</p>
		</section>
	),
};
