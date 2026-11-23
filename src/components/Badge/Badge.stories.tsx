import type { Meta, StoryObj } from '@storybook/react';
import type { BadgeOptions } from '../../index';
import { badgeAliases, badgeVariants } from '../../../.storybook/helpers/catalog';

import '../../css/index.css';

type BadgeVariant = NonNullable<BadgeOptions['variant']>;
const VARIANTS = badgeVariants as BadgeVariant[];
const ALIASES = badgeAliases as BadgeVariant[];

/**
 * A badge labels an item with a short, semantic status.
 *
 * Badge works with CSS alone. An optional typed `Badge` React wrapper is also
 * available; see [React Components / Badge](?path=/docs/react-components-badge--docs). For HTML usage, apply the
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
	title: 'Block Styles/Badge',
	tags: ['autodocs'],
	parameters: { docs: { source: { language: 'html', type: 'dynamic' } } },
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
		<div className="cluster" data-cluster-gap="4">
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
		<div className="cluster" data-cluster-gap="4">
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
