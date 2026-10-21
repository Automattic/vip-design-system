import type { Meta, StoryObj } from '@storybook/react';
import badgeTokens from '../../../tokens/component/badge.json';

import '../../css/index.css';

const aliases = badgeTokens.badge.variants.$extensions['com.automattic.vip.css'].aliases;
type BadgeAlias = keyof typeof aliases;
type BadgeVariant = 'gray' | 'blue' | 'green' | 'red' | 'gold' | 'yellow' | BadgeAlias;

const VARIANTS: BadgeVariant[] = ['gray', 'blue', 'green', 'red', 'gold', 'yellow'];
const ALIASES = Object.keys(aliases) as BadgeAlias[];

/**
 * A badge labels an item with a short, semantic status.
 *
 * Badge is **CSS-only** — there is no React component to import. Apply the
 * `.badge` class together with a typography utility, and set the colour with
 * the `data-badge-variant` attribute:
 *
 * ```html
 * <span class="badge type-support-label-xs" data-badge-variant="error">Failed</span>
 * ```
 *
 * The six colours map onto the support token sets, so a badge speaks the same
 * language as notices and snackbars: `gray` is `system`, `blue` is `info`,
 * `green` is `success`, `red` is `error`, `gold` is `brand` and `yellow` is
 * `warning`. Both names work as attribute values: `info` and `blue`, for
 * example, select the same variant. Omit `data-badge-variant` for `gray`.
 *
 * In light mode a badge is a tinted chip with a transparent border. In dark
 * mode the border and label use the set’s text color, while the fill continues
 * to use its theme-aware support background token.
 */
const meta: Meta<BadgeArgs> = {
	title: 'Blocks/Badge',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: [...VARIANTS, ...ALIASES],
			description: 'Semantic colour, applied via the `data-badge-variant` attribute.',
			table: { defaultValue: { summary: 'gray' } },
		},
		label: { control: 'text', description: 'Badge text.' },
	},
	args: { variant: 'gray', label: 'Primary' },
	render: ({ variant, label }) => <Badge variant={variant}>{label}</Badge>,
};

type BadgeArgs = { variant: BadgeVariant; label: string };

function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
	return (
		<span
			className="badge type-support-label-xs"
			data-badge-variant={variant === 'gray' ? undefined : variant}
		>
			{children}
		</span>
	);
}

export default meta;
type Story = StoryObj<BadgeArgs>;

/** The default badge. Omit `data-badge-variant` to get `gray`. */
export const Default: Story = {};

/** All six colours, each mapping to one of the support token sets. */
export const AllVariants: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			{VARIANTS.map((variant) => (
				<Badge key={variant} variant={variant}>
					{variant.charAt(0).toUpperCase() + variant.slice(1)}
				</Badge>
			))}
		</div>
	),
};

/** Semantic names are aliases of the same six color variants. */
export const SemanticAliases: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			{ALIASES.map((variant) => (
				<Badge key={variant} variant={variant}>
					{variant.charAt(0).toUpperCase() + variant.slice(1)}
				</Badge>
			))}
		</div>
	),
};

/**
 * In dark mode, badges use the support set’s text color on both border and
 * label, with the theme-aware support background token for the fill.
 *
 * This canvas starts in Dark mode independently of the OS. Use its Color mode
 * selector to compare Light or System without changing the other examples.
 */
export const DarkMode: Story = {
	parameters: { colorMode: 'dark' },
	render: AllVariants.render,
};
