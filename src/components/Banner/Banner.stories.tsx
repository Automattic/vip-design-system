import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

const PURPOSES = ['error', 'warning', 'info', 'system', 'brand'] as const;
type Purpose = (typeof PURPOSES)[number];

/** Outline stand-ins; Figma uses the solid `bxs-*` set. See Notice for the list. */
const ICONS: Record<Purpose, string> = {
	error: 'bx-error-circle',
	warning: 'bx-error',
	info: 'bx-info-circle',
	system: 'bx-cog',
	brand: 'bx-info-circle',
};

const HEADINGS: Record<Purpose, string> = {
	error: 'There is a site-wide error you should know about',
	warning: 'Scheduled maintenance is coming up',
	info: 'There is something new to look at',
	system: 'A platform operation is in progress',
	brand: 'Something worth announcing',
};

function Icon({ name }: { name: string }) {
	return (
		<svg className="banner__icon icon" aria-hidden="true">
			<use href={`/dist/sprite.svg#${name}`} />
		</svg>
	);
}

/**
 * A banner carries a notice that belongs to the whole site rather than to the
 * page in front of you — an outage, scheduled maintenance, an announcement. It
 * spans the full width and squares its corners.
 *
 * ```html
 * <div class="banner" data-banner-variant="brand">
 *   <svg class="banner__icon icon" aria-hidden="true">…</svg>
 *   <div class="banner__text">
 *     <p class="banner__heading type-heading-4">Something worth announcing</p>
 *     <p class="type-body-default">This is a message.</p>
 *   </div>
 *   <div class="banner__actions">…</div>
 * </div>
 * ```
 *
 * ### Why this is its own block, not a notice variant
 *
 * The two do not carry the same purposes. A banner has **`brand`** and no
 * `success`; an inline notice has **`success`** and no `brand`. In the design
 * file today that shows up as the inline notice's token set covering four of
 * the banner's five purposes, with `brand` falling through to the raw semantic
 * `color/support/brand/background` — a token set with a hole in it.
 *
 * Giving banner its own set closes that hole without forcing either component
 * to carry a purpose it never uses. Both sets alias the same `color.support.*`
 * semantics, so no colour value is duplicated; only the aliases are, which is
 * exactly what the component tier is for.
 *
 * ### Actions, not links
 *
 * A banner's actions are buttons pinned to the inline end, so unlike the notice
 * family there is no link colour pair in its tokens.
 */
const meta: Meta<Args> = {
	title: 'Blocks/Banner',
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	argTypes: {
		purpose: {
			control: 'inline-radio',
			options: PURPOSES,
			description: 'Applied via the `data-banner-variant` attribute.',
			table: { defaultValue: { summary: 'info' } },
		},
		heading: { control: 'text', description: 'Omit to get the single-line variant.' },
		message: { control: 'text' },
		withActions: { control: 'boolean' },
	},
	args: {
		purpose: 'error',
		heading: 'There is a site-wide error you should know about',
		message: 'This is a message. Lorem ipsum dolor sit amet consectetur.',
		withActions: true,
	},
	render: (args) => <Banner {...args} />,
};

type Args = { purpose: Purpose; heading: string; message: string; withActions: boolean };

function Banner({ purpose, heading, message, withActions }: Args) {
	return (
		<div className="banner" data-banner-variant={purpose} role="status">
			<Icon name={ICONS[purpose]} />
			<div className="banner__text">
				{heading && <p className="banner__heading type-heading-4">{heading}</p>}
				{message && <p className="type-body-default">{message}</p>}
			</div>
			{withActions && (
				<div className="banner__actions">
					<button className="button" data-variant="ghost" data-size="compact" type="button">
						Action
					</button>
					<button className="button" data-variant="ghost" data-size="compact" type="button">
						Action
					</button>
				</div>
			)}
		</div>
	);
}

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

/** The single-line form — Figma's `variant=default`. */
export const WithoutHeading: Story = {
	args: { heading: '', message: 'There is a site-wide error you should know about' },
};

/** All five purposes. Note `brand` in place of the notice family's `success`. */
export const AllPurposes: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-close)' }}>
			{PURPOSES.map((purpose) => (
				<Banner
					key={purpose}
					purpose={purpose}
					heading={HEADINGS[purpose]}
					message="This is a message. Lorem ipsum dolor sit amet consectetur."
					withActions
				/>
			))}
		</div>
	),
};

export const DarkMode: Story = {
	parameters: { colorMode: 'dark' },
	render: AllPurposes.render,
};
