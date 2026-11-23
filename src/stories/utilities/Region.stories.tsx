import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Utility Styles/Region',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['region'] +
					'\n\nApply `.region` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'region', 'the Region React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('region', 'css'),
	args: { 'data-region-space': '6' },
	render: (args) => (
		<section className="region bg-layer-2" {...cssAttributes(args)}>
			<div className="wrapper flow" data-flow-space="4">
				<h2 className="type-heading-3">A section of content</h2>
				<p>Region sets vertical space; Wrapper constrains the content width.</p>
			</div>
		</section>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};

/** Region padding and Flow sibling spacing work independently on one element. */
export const WithFlow: Story = {
	render: () => (
		<article className="region flow" data-region-space="6" data-flow-space="4">
			<h2 className="type-heading-3">Release notes</h2>
			<p>Region supplies padding.</p>
			<p>Flow supplies spacing between direct children.</p>
		</article>
	),
};
