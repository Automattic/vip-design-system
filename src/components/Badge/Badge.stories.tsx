import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

type BadgeColor = 'gray' | 'blue' | 'green' | 'red' | 'gold' | 'yellow';

const COLORS: BadgeColor[] = ['gray', 'blue', 'green', 'red', 'gold', 'yellow'];

/**
 * A badge labels an item with a short, semantic status.
 *
 * Badge is **CSS-only** — there is no React component to import. Apply the
 * `.badge` class together with a typography utility, and set the colour with
 * the `data-color` attribute:
 *
 * ```html
 * <span class="badge type-support-label-xs" data-color="red">Failed</span>
 * ```
 *
 * The six colours map onto the support token sets, so a badge speaks the same
 * language as notices and snackbars: `gray` is `system`, `blue` is `info`,
 * `green` is `success`, `red` is `error`, `gold` is `brand` and `yellow` is
 * `warning`. Omit `data-color` for `gray`.
 *
 * In light mode a badge is a tinted chip with a transparent border. In dark
 * mode it inverts to an outline — the fill drops away and the border and label
 * both take the set's `text` colour.
 */
const meta: Meta<BadgeArgs> = {
	title: 'Blocks/Badge',
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: 'select',
			options: COLORS,
			description: 'Semantic colour, applied via the `data-color` attribute.',
			table: { defaultValue: { summary: 'gray' } },
		},
		label: { control: 'text', description: 'Badge text.' },
	},
	args: { color: 'gray', label: 'Primary' },
	render: ({ color, label }) => <Badge color={color}>{label}</Badge>,
};

type BadgeArgs = { color: BadgeColor; label: string };

function Badge({ color, children }: { color: BadgeColor; children: React.ReactNode }) {
	return (
		<span className="badge type-support-label-xs" data-color={color === 'gray' ? undefined : color}>
			{children}
		</span>
	);
}

export default meta;
type Story = StoryObj<BadgeArgs>;

/** The default badge. Omit `data-color` to get `gray`. */
export const Default: Story = {};

/** All six colours, each mapping to one of the support token sets. */
export const AllColors: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			{COLORS.map((color) => (
				<Badge key={color} color={color}>
					{color.charAt(0).toUpperCase() + color.slice(1)}
				</Badge>
			))}
		</div>
	),
};

/**
 * Badges invert in dark mode: the tinted fill is replaced by a transparent
 * background with the set's `text` colour on both border and label.
 *
 * The theme classes are scoped to `:root` (`:root.theme-dark`), so they cannot
 * be used to preview a dark region inside a light page. This story instead
 * sets `color-scheme: dark` on the wrapper — that is what `light-dark()`
 * actually resolves against, and it inherits to the badges inside.
 */
export const DarkMode: Story = {
	render: () => (
		<div
			style={{
				colorScheme: 'dark',
				background: 'var(--color-background-primary)',
				padding: 'var(--space-comfortable)',
			}}
		>
			<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
				{COLORS.map((color) => (
					<Badge key={color} color={color}>
						{color.charAt(0).toUpperCase() + color.slice(1)}
					</Badge>
				))}
			</div>
		</div>
	),
};
