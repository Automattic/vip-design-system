import type { Meta, StoryObj } from '@storybook/react';
import {
	configurationControls,
	cssAttributes,
	counterpart,
	type CSSArgs,
} from '../../../.storybook/helpers/catalog';
import { descriptions } from '../../../.storybook/helpers/descriptions';

const meta = {
	title: 'Composition Styles/Switcher',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					descriptions['switcher'] +
					'\n\nApply `.switcher` and configure it with the attributes below. Omitted attributes use CSS defaults. See ' +
					counterpart('react-components', 'switcher', 'the Switcher React component') +
					'.',
			},
		},
	},
	argTypes: configurationControls('switcher', 'css'),
	args: {},
	render: (args) => (
		<div className="switcher" {...cssAttributes(args)}>
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

/** A constrained parent demonstrates the layout’s intrinsic wrap behavior. */
export const NarrowContainer: Story = {
	decorators: [
		(Story) => (
			<div style={{ maxWidth: '20rem' }}>
				<Story />
			</div>
		),
	],
};
