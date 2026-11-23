import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Reel',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['reel'] +
					'\n\nApply `.reel` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'reel', 'the Reel React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('reel', 'css'),
	args: { 'data-reel-item-inline-size': '12rem' },
	render: (args) => (
		<div
			className="reel"
			tabIndex={0}
			role="region"
			aria-label="Scrollable items"
			{...cssAttributes(args)}
		>
			<div className="box" data-box-padding="4">
				First item
			</div>
			<div className="box" data-box-padding="4">
				Second item
			</div>
			<div className="box" data-box-padding="4">
				Third item
			</div>
			<div className="box" data-box-padding="4">
				Fourth item
			</div>
			<div className="box" data-box-padding="4">
				Fifth item
			</div>
			<div className="box" data-box-padding="4">
				Sixth item
			</div>
		</div>
	),
} satisfies Meta<CSSArgs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
