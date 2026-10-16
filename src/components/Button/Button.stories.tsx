import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

type Variant =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'ghost'
	| 'display'
	| 'danger'
	| 'danger-secondary'
	| 'danger-ghost';

const CORE: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost', 'display'];
const DANGER: Variant[] = ['danger', 'danger-secondary', 'danger-ghost'];

/** Renders a sprite icon. Requires `npm run build:icons` for the symbol to resolve. */
function Icon({ name }: { name: string }) {
	return (
		<svg className="icon" aria-hidden="true">
			<use href={`/dist/sprite.svg#${name}`} />
		</svg>
	);
}

/**
 * Buttons are **CSS-only** — apply `.button` plus a typography utility to a
 * native `<button>`:
 *
 * ```html
 * <button class="button type-support-label-default" data-variant="secondary">
 *   Save
 * </button>
 * ```
 *
 * ### Variants
 *
 * `data-variant` takes `primary` (default), `secondary`, `tertiary`, `ghost`,
 * `display`, and the three destructive variants `danger`, `danger-secondary`
 * and `danger-ghost`.
 *
 * ### Icons
 *
 * `data-icon` tightens the padding on the icon side — 12px against the icon,
 * 16px against the label — and takes `leading`, `trailing` or `only`. Icons
 * inside a button are a fixed 16px rather than the `1cap` used in running
 * text, set through the `--icon-size` hook on `.icon`.
 *
 * An `only` button is a 38px square and has no visible text, so it **must**
 * carry an `aria-label`.
 *
 * ### Sizes
 *
 * Default is 38px tall. `data-size="medium"` gives 32px.
 *
 * ### States
 *
 * Use the native `:disabled` attribute. `data-state="disabled"` exists for
 * non-button elements that need the same appearance. Focus is handled by
 * `:focus-visible`, not Figma — the design file has no opinion on it.
 */
const meta: Meta<ButtonArgs> = {
	title: 'Blocks/Button',
	tags: ['autodocs'],
	argTypes: {
		variant: { control: 'select', options: [...CORE, ...DANGER] },
		size: { control: 'inline-radio', options: ['default', 'medium'] },
		icon: { control: 'inline-radio', options: ['none', 'leading', 'trailing', 'only'] },
		label: { control: 'text' },
		disabled: { control: 'boolean' },
	},
	args: {
		variant: 'primary',
		size: 'default',
		icon: 'none',
		label: 'Default Button',
		disabled: false,
	},
	render: (args) => <Button {...args} />,
};

type ButtonArgs = {
	variant: Variant;
	size: 'default' | 'medium';
	icon: 'none' | 'leading' | 'trailing' | 'only';
	label: string;
	disabled: boolean;
};

function Button({ variant, size, icon, label, disabled }: ButtonArgs) {
	return (
		<button
			className="button type-support-label-default"
			data-variant={variant === 'primary' ? undefined : variant}
			data-size={size === 'default' ? undefined : size}
			data-icon={icon === 'none' ? undefined : icon}
			aria-label={icon === 'only' ? label : undefined}
			disabled={disabled}
		>
			{icon === 'leading' && <Icon name="bx-plus" />}
			{icon !== 'only' && label}
			{icon === 'trailing' && <Icon name="bx-arrow-right" />}
			{icon === 'only' && <Icon name="bx-trash" />}
		</button>
	);
}

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Default: Story = {};

/** The five core variants. */
export const Variants: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			{CORE.map((variant) => (
				<Button
					key={variant}
					variant={variant}
					size="default"
					icon="none"
					disabled={false}
					label={variant[0].toUpperCase() + variant.slice(1)}
				/>
			))}
		</div>
	),
};

/** The destructive variants, a separate component set in Figma. */
export const Danger: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			{DANGER.map((variant) => (
				<Button
					key={variant}
					variant={variant}
					size="default"
					icon="none"
					disabled={false}
					label={variant === 'danger' ? 'Delete' : variant.replace('danger-', 'Delete ')}
				/>
			))}
		</div>
	),
};

/**
 * Leading, trailing and icon-only. Note the asymmetric padding: the icon side
 * is 12px, the label side 16px.
 */
export const Icons: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			<Button variant="primary" size="default" icon="leading" disabled={false} label="Add item" />
			<Button
				variant="secondary"
				size="default"
				icon="trailing"
				disabled={false}
				label="Continue"
			/>
			<Button variant="ghost" size="default" icon="only" disabled={false} label="Delete" />
		</div>
	),
};

/** Default is 38px; `data-size="medium"` is 32px. */
export const Sizes: Story = {
	render: () => (
		<div
			className="cluster"
			style={{
				['--cluster-gap' as string]: 'var(--space-close)',
				['--cluster-block-alignment' as string]: 'center',
			}}
		>
			<Button variant="primary" size="default" icon="none" disabled={false} label="Default 38px" />
			<Button variant="primary" size="medium" icon="none" disabled={false} label="Medium 32px" />
		</div>
	),
};

/** Disabled uses the native attribute, which also removes pointer events. */
export const Disabled: Story = {
	render: () => (
		<div className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			{(['primary', 'secondary', 'tertiary', 'ghost'] as Variant[]).map((variant) => (
				<Button
					key={variant}
					variant={variant}
					size="default"
					icon="none"
					disabled
					label={variant[0].toUpperCase() + variant.slice(1)}
				/>
			))}
		</div>
	),
};
