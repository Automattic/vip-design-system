import { landscape } from '../../../.storybook/helpers/assets';
import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Frame',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['frame'] +
					'\n\nApply `.frame` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'frame', 'the Frame React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('frame', 'css'),
	args: {},
	render: (args) => (
		<div className="frame" {...cssAttributes(args)}>
			<img src={landscape} alt="Illustration of a mountain landscape at sunset" />
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
