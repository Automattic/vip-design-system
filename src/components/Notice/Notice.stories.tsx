import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

const PURPOSES = ['error', 'warning', 'success', 'info', 'system'] as const;
type Purpose = (typeof PURPOSES)[number];

/**
 * Figma draws these with the solid Boxicons set. Our curated set holds the
 * outline variants, so these are the closest stand-ins until the five solid
 * icons are added: `bxs-error-circle`, `bxs-error`, `bxs-check-circle`,
 * `bxs-info-circle`, `bxs-cog`.
 */
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

function Icon({ name, className }: { name: string; className: string }) {
	return (
		<svg className={`${className} icon`} aria-hidden="true">
			<use href={`/dist/sprite.svg#${name}`} />
		</svg>
	);
}

/**
 * A notice is an elevated card that reports the outcome of something the
 * reader just did, or the state of the thing they are looking at.
 *
 * Notice is **CSS-only** — there is no React component to import.
 *
 * ```html
 * <div class="notice" data-notice-variant="error">
 *   <svg class="notice__icon icon" aria-hidden="true">…</svg>
 *   <div class="notice__text">
 *     <p class="notice__heading type-heading-4">There are errors in your form</p>
 *     <div class="notice__body">
 *       <p class="type-body-default">This is a message.</p>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * ### One surface, five purposes
 *
 * Unlike the inline notice, the card does **not** tint. It is `layer.2` in
 * every purpose, and the purpose shows only in the accent flag down its inline
 * start edge, the icon, and the link colour. That is what the design file
 * specifies: the `-notice/*` token set has a single background and no
 * per-purpose background at all.
 *
 * ### The heading is optional
 *
 * Figma's "default" variant is this same card carrying only its first line.
 * Drop `.notice__heading` and the body renders on its own.
 *
 * ### Announcing a notice
 *
 * The block is styling only. A notice that appears in response to an action
 * needs `role="status"` (or `role="alert"` when it is an error that interrupts),
 * or a screen reader will never announce it.
 */
const meta: Meta<NoticeArgs> = {
	title: 'Block Styles/Notice',
	tags: ['autodocs'],
	argTypes: {
		purpose: {
			control: 'inline-radio',
			options: PURPOSES,
			description: 'Applied via the `data-notice-variant` attribute.',
			table: { defaultValue: { summary: 'info' } },
		},
		heading: { control: 'text', description: 'Omit to get the single-line variant.' },
		message: { control: 'text' },
		withList: { control: 'boolean', description: 'Show a bulleted list of linked errors.' },
		withDismiss: { control: 'boolean' },
	},
	args: {
		purpose: 'error',
		heading: 'There are errors in your form',
		message: 'This is a message. Lorem ipsum dolor sit amet consectetur.',
		withList: true,
		withDismiss: false,
	},
	render: (args) => <Notice {...args} />,
};

type NoticeArgs = {
	purpose: Purpose;
	heading: string;
	message: string;
	withList: boolean;
	withDismiss: boolean;
};

function Notice({ purpose, heading, message, withList, withDismiss }: NoticeArgs) {
	return (
		<div className="notice" data-notice-variant={purpose} role="status">
			<Icon className="notice__icon" name={ICONS[purpose]} />
			<div className="notice__text">
				{heading && <p className="notice__heading type-heading-4">{heading}</p>}
				<div className="notice__body">
					{message && <p className="type-body-default">{message}</p>}
					{withList && (
						<ul className="notice__list type-body-default">
							<li>
								<a className="notice__link" href="#name">
									Please enter your name
								</a>
							</li>
							<li>
								<a className="notice__link" href="#email">
									Please enter your email address
								</a>
							</li>
						</ul>
					)}
				</div>
			</div>
			{withDismiss && (
				<div className="notice__actions">
					<button className="button" data-variant="ghost" data-size="compact" type="button">
						Action
					</button>
				</div>
			)}
		</div>
	);
}

export default meta;
type Story = StoryObj<NoticeArgs>;

export const Default: Story = {};

/** The single-line form — Figma's `variant=default`. */
export const WithoutHeading: Story = {
	args: { heading: '', withList: false, message: 'There are errors in your form' },
};

/** All five purposes, each carrying its own accent, icon and link colour. */
export const AllPurposes: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-modest)' }}>
			{PURPOSES.map((purpose) => (
				<Notice
					key={purpose}
					purpose={purpose}
					heading={HEADINGS[purpose]}
					message="This is a message. Lorem ipsum dolor sit amet consectetur."
					withList={false}
					withDismiss={false}
				/>
			))}
		</div>
	),
};

/**
 * The card keeps one surface in dark mode too — `layer.2` flips, the accent
 * and link colours follow their support sets.
 */
export const DarkMode: Story = {
	parameters: { colorMode: 'dark' },
	render: AllPurposes.render,
};
