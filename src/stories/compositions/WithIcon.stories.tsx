import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/With Icon',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['with-icon'] +
					'\n\nApply `.with-icon` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'with-icon', 'the With Icon React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('with-icon', 'css'),
	args: {},
	render: (args) => (
		<span className="with-icon" {...cssAttributes(args)}>
			<svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
				<path d="m9 16.2-4.2-4.2L3.4 13.4 9 19 21 7l-1.4-1.4z" />
			</svg>
			<span>Published</span>
		</span>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
