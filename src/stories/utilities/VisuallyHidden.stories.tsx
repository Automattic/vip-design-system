import type { Meta, StoryObj } from '@storybook/react';
import { useId } from 'react';

const meta = {
	title: 'Utility Styles/Visually Hidden',
	tags: ['autodocs'],
	parameters: {
		docs: {
			source: { language: 'html', type: 'dynamic' },
			description: {
				component:
					'The `.visually-hidden` utility keeps content available to assistive technology while hiding it visually. It has no configuration options. It becomes visible when the element itself is focused or active, making it suitable for skip links. Put the class on the focusable element, not its parent. Do not use it to hide interactive content from keyboard users. There is no React wrapper; use the class directly.',
			},
		},
	},
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const AccessibleLabel: Story = {
	render: () => (
		<a className="button" href="./?path=/docs/utility-styles-icon--docs" target="_top">
			<svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M3 5h18v14H3zm2 2v10h14V7z" />
			</svg>
			<span className="visually-hidden">Read the Icon documentation</span>
		</a>
	),
};
function SkipLinkExample() {
	const target = useId();
	return (
		<div className="flow" data-flow-space="4">
			<a className="visually-hidden" href={`#${target}`}>
				Skip to example content
			</a>
			<p>Tab into this canvas to reveal the skip link.</p>
			<div id={target} tabIndex={-1}>
				Example content
			</div>
		</div>
	);
}
export const SkipLink: Story = { render: () => <SkipLinkExample /> };
