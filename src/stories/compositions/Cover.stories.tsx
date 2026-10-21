import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Cover',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['cover'] +
					'\n\nApply `.cover` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'cover', 'the Cover React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('cover', 'css'),
	args: { 'data-cover-min-height': '20rem' },
	render: (args) => (
		<div className="cover" {...cssAttributes(args)}>
			<header>Deployment overview</header>
			<div className="flow" data-flow-space="4">
				<h2 className="type-heading-3">Ready to publish</h2>
				<p>The main content stays centered.</p>
			</div>
			<footer>Updated just now</footer>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
