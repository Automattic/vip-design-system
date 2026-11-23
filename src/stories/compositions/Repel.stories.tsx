import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Repel',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['repel'] +
					'\n\nApply `.repel` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'repel', 'the Repel React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('repel', 'css'),
	args: {},
	render: (args) => (
		<div className="repel" {...cssAttributes(args)}>
			<strong>Deployment</strong>
			<span className="badge type-support-label-xs" data-badge-variant="success">
				Published
			</span>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
