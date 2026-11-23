import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Stack',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['stack'] +
					'\n\nApply `.stack` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'stack', 'the Stack React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('stack', 'css'),
	args: {},
	render: (args) => (
		<div className="stack" {...cssAttributes(args)}>
			<div className="box" data-box-padding="4">
				First item
			</div>
			<div className="box" data-box-padding="4">
				Second item
			</div>
			<div className="box" data-box-padding="4">
				Third item
			</div>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
