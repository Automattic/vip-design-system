import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

const PURPOSES = ['error', 'warning', 'success', 'info', 'system'] as const;
type Purpose = (typeof PURPOSES)[number];

/** Outline stand-ins; Figma uses the solid `bxs-*` set. See Notice for the list. */
const ICONS: Record<Purpose, string> = {
	error: 'bx-error-circle',
	warning: 'bx-error',
	success: 'bx-check',
	info: 'bx-info-circle',
	system: 'bx-cog',
};

const HEADINGS: Record<Purpose, string> = {
	error: 'Something went wrong',
	warning: 'Check this before continuing',
	success: 'Saved',
	info: 'Heads up',
	system: 'Working on it',
};

function Icon({ name, className }: { name: string; className: string }) {
	return (
		<svg className={`${className} icon`} aria-hidden="true">
			<use href={`/dist/sprite.svg#${name}`} />
		</svg>
	);
}

/**
 * A snackbar is a transient, inverted toast — it confirms that something
 * happened and then goes away.
 *
 * ```html
 * <div class="snackbar" data-snackbar-variant="error" role="status">
 *   <svg class="snackbar__icon icon" aria-hidden="true">…</svg>
 *   <div class="snackbar__text">
 *     <p class="snackbar__heading type-heading-5">Something went wrong</p>
 *     <p class="type-body-small">Error message.</p>
 *   </div>
 *   <div class="snackbar__actions">…</div>
 * </div>
 * ```
 *
 * ### The inverse ramp
 *
 * The surface is dark in **both** themes, so the icon accent cannot use the
 * same colours as a notice — they are tuned for a light fill. It uses the
 * support sets' `inverse` step instead, which exists for exactly this surface.
 * Every one of the five lands on it precisely.
 *
 * ### Two differences from the notice family
 *
 * The type is one step smaller — 12px heading and body against 14px — and the
 * icon is centred on the whole block rather than on the first line.
 *
 * ### Known contrast problem in dark mode
 *
 * `color.text.inverse-secondary` carries a dark-mode override that assumes an
 * inverse surface flips to light. `color.layer.inverse` does not flip, so in
 * dark mode the body text lands at **2.48:1** and fails AA. Light mode is fine
 * at 8.15:1. The fix belongs in the semantic token, so it is flagged rather
 * than patched around in the block — see the note in `snackbar.css`.
 */
const meta: Meta<Args> = {
	title: 'Blocks/Snackbar',
	tags: ['autodocs'],
	argTypes: {
		purpose: {
			control: 'inline-radio',
			options: PURPOSES,
			description: 'Applied via the `data-snackbar-variant` attribute.',
			table: { defaultValue: { summary: 'info' } },
		},
		heading: { control: 'text', description: 'Optional — Figma calls it "Header (optional)".' },
		message: { control: 'text' },
		action: { control: 'text', description: 'Omit to drop the action button.' },
	},
	args: {
		purpose: 'error',
		heading: 'Something went wrong',
		message: 'Error message.',
		action: 'Resolve',
	},
	render: (args) => <Snackbar {...args} />,
};

type Args = { purpose: Purpose; heading: string; message: string; action: string };

function Snackbar({ purpose, heading, message, action }: Args) {
	return (
		<div
			className="snackbar"
			data-snackbar-variant={purpose}
			role="status"
			style={{ maxWidth: 398 }}
		>
			<Icon className="snackbar__icon" name={ICONS[purpose]} />
			<div className="snackbar__text">
				{heading && <p className="snackbar__heading type-heading-5">{heading}</p>}
				{message && <p className="type-body-small">{message}</p>}
			</div>
			<div className="snackbar__actions">
				{action && (
					<button className="snackbar__action type-support-label-small" type="button">
						{action}
					</button>
				)}
				<button className="snackbar__dismiss" type="button" aria-label="Dismiss">
					<svg className="icon" aria-hidden="true">
						<use href="/dist/sprite.svg#bx-x" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

/** The single-line form — Figma's `variant=default`. */
export const WithoutHeading: Story = {
	args: { heading: '', message: 'Something went wrong' },
};

/** All five purposes, each on the support set's `inverse` accent. */
export const AllPurposes: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-close)' }}>
			{PURPOSES.map((purpose) => (
				<Snackbar
					key={purpose}
					purpose={purpose}
					heading={HEADINGS[purpose]}
					message="This is the message."
					action="Resolve"
				/>
			))}
		</div>
	),
};

/**
 * The surface stays dark, so this canvas should look much like the light one.
 * The body text is the exception — see the contrast note above.
 */
export const DarkMode: Story = {
	parameters: { colorMode: 'dark' },
	render: AllPurposes.render,
};
