import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Grid',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['grid'] +
					'\n\nApply `.grid` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'grid', 'the Grid React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('grid', 'css'),
	args: { 'data-grid-min-item-size': '8rem' },
	render: (args) => (
		<div className="grid" {...cssAttributes(args)}>
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
/** Drag the bottom-right edge to test behavior at different container widths. */
export const Playground: Story = {
	decorators: [
		(Story) => (
			<div
				style={{
					resize: 'horizontal',
					overflow: 'auto',
					width: '100%',
					minWidth: '16rem',
					maxWidth: '100%',
					paddingBottom: '1rem',
				}}
			>
				<Story />
			</div>
		),
	],
};
