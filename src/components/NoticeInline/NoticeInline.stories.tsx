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
	error: 'There are errors in your form',
	warning: 'This is a warning message',
	success: 'This is a success message',
	info: 'This is an informational message',
	system: 'Operation in progress…',
};

function Icon({ name }: { name: string }) {
	return (
		<svg className="notice-inline__icon icon" aria-hidden="true">
			<use href={`/dist/sprite.svg#${name}`} />
		</svg>
	);
}

/**
 * An inline notice is a tinted block that sits in the flow of a page, next to
 * the thing it is about — under a form, inside a panel.
 *
 * ```html
 * <div class="notice-inline" data-notice-inline-variant="error">
 *   <svg class="notice-inline__icon icon" aria-hidden="true">…</svg>
 *   <div class="notice-inline__text">
 *     <p class="notice-inline__heading type-heading-4">There are errors…</p>
 *     <div class="notice-inline__body">…</div>
 *   </div>
 * </div>
 * ```
 *
 * ### How it differs from Notice
 *
 * Structurally, not at all — same padding, same icon placement, same
 * heading/body/list column, same five purposes. The difference is the surface:
 * this one **tints per purpose** and sits flat in the page, where the card is
 * one white surface with a shadow and an accent flag.
 *
 * They stay separate blocks because the design file keeps them as separate
 * components with separate token sets, and because the generated configuration
 * CSS binds one token set to one class.
 */
const meta: Meta<Args> = {
	title: 'Blocks/Notice Inline',
	tags: ['autodocs'],
	argTypes: {
		purpose: {
			control: 'inline-radio',
			options: PURPOSES,
			description: 'Applied via the `data-notice-inline-variant` attribute.',
			table: { defaultValue: { summary: 'info' } },
		},
		heading: { control: 'text', description: 'Omit to get the single-line variant.' },
		message: { control: 'text' },
		withList: { control: 'boolean' },
	},
	args: {
		purpose: 'error',
		heading: 'There are errors in your form',
		message: 'This is a message. Lorem ipsum dolor sit amet consectetur.',
		withList: true,
	},
	render: (args) => <NoticeInline {...args} />,
};

type Args = { purpose: Purpose; heading: string; message: string; withList: boolean };

function NoticeInline({ purpose, heading, message, withList }: Args) {
	return (
		<div className="notice-inline" data-notice-inline-variant={purpose} role="status">
			<Icon name={ICONS[purpose]} />
			<div className="notice-inline__text">
				{heading && <p className="notice-inline__heading type-heading-4">{heading}</p>}
				<div className="notice-inline__body">
					{message && <p className="type-body-default">{message}</p>}
					{withList && (
						<ul className="notice-inline__list type-body-default">
							<li>
								<a className="notice-inline__link" href="#name">
									Please enter your name
								</a>
							</li>
							<li>
								<a className="notice-inline__link" href="#email">
									Please enter your email address
								</a>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

/** The single-line form — Figma's `variant=default`. */
export const WithoutHeading: Story = {
	args: { heading: '', withList: false, message: 'There are errors in your form' },
};

/** All five purposes. Here the purpose drives the fill as well as the accent. */
export const AllPurposes: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-modest)' }}>
			{PURPOSES.map((purpose) => (
				<NoticeInline
					key={purpose}
					purpose={purpose}
					heading={HEADINGS[purpose]}
					message="This is a message. Lorem ipsum dolor sit amet consectetur."
					withList={false}
				/>
			))}
		</div>
	),
};

export const DarkMode: Story = {
	parameters: { colorMode: 'dark' },
	render: AllPurposes.render,
};
