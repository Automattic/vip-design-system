import { sprite } from '../../../.storybook/helpers/assets';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Utility Styles/Icon',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					'The `.icon` utility sizes an SVG to the surrounding font’s cap height (`1cap`, with a `0.75em` fallback) and inherits its color through `currentColor`. Use `.with-icon` to align it beside text. The `--icon-size` CSS variable can override its size; there is currently no data-attribute knob or React Icon wrapper. Decorative icons need `aria-hidden="true"`; an icon-only control needs an accessible name. See [With Icon](?path=/docs/composition-styles-with-icon--docs) for the layout pattern.',
			},
		},
	},
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithText: Story = {
	render: () => (
		<span className="with-icon">
			<svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
				<path d="m9 16.2-4.2-4.2L3.4 13.4 9 19 21 7l-1.4-1.4z" />
			</svg>
			Published
		</span>
	),
};
/** The sprite is built from the repository’s icons. Applications supply its deployed URL. */
export const Sprite: Story = {
	render: () => (
		<span className="with-icon">
			<svg className="icon" aria-hidden="true">
				<use href={`${sprite}#bx-check`} />
			</svg>
			Saved
		</span>
	),
};
