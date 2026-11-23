import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Wrapper',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['wrapper'] +
					'\n\nApply `.wrapper` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'wrapper', 'the Wrapper React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('wrapper', 'css'),
	args: {},
	render: (args) => (
		<div className="wrapper" {...cssAttributes(args)}>
			<div className="box" data-box-padding="4">
				Centered content, with breathing room at both edges.
			</div>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
