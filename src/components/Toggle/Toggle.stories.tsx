import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

/**
 * A toggle is a **native `<input type="checkbox">`** with a visual track
 * beside it:
 *
 * ```html
 * <label class="toggle">
 *   <input type="checkbox" class="toggle__input">
 *   <span class="toggle__track"></span>
 *   <span class="type-support-label-default">Email notifications</span>
 * </label>
 * ```
 *
 * The input is visually hidden rather than removed, so it keeps native
 * keyboard operation, the checked state and its announcement. `display: none`
 * or `visibility: hidden` would take it out of the accessibility tree and make
 * it unfocusable.
 *
 * ### Toggle or checkbox?
 *
 * A toggle takes effect immediately — it *is* the action. A checkbox states an
 * intention that something else later commits, usually a submit button. If the
 * control sits in a form that gets saved, it is a checkbox.
 *
 * ### One departure from the design file
 *
 * Figma draws the thumb at the same position in all four variants — it never
 * moves — and puts the indicator on the right in all four, including "on".
 * Built literally that is a switch whose position says nothing about its
 * state, which reads as an authoring slip: had the thumb been moved for "on",
 * the indicator would have had to move too or they would overlap. So the thumb
 * slides and the indicator takes the opposite side. Everything else — size,
 * colours, thumb geometry, shadow, the glyphs — is Figma's.
 */
const meta: Meta<ToggleArgs> = {
	title: 'Blocks/Toggle',
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
	},
	args: { checked: false, disabled: false, label: 'Email notifications' },
	render: (args) => <Toggle {...args} />,
};

type ToggleArgs = { checked: boolean; disabled: boolean; label: string };

function Toggle({ checked, disabled, label }: ToggleArgs) {
	return (
		<label className="toggle">
			<input
				type="checkbox"
				className="toggle__input"
				defaultChecked={checked}
				disabled={disabled}
			/>
			<span className="toggle__track" />
			<span className="type-support-label-default">{label}</span>
		</label>
	);
}

export default meta;
type Story = StoryObj<ToggleArgs>;

export const Default: Story = {};

/** Every state the control can be in. */
export const States: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-close)' }}>
			<Toggle checked={false} disabled={false} label="Off" />
			<Toggle checked disabled={false} label="On" />
			<Toggle checked={false} disabled label="Off, disabled" />
			<Toggle checked disabled label="On, disabled" />
		</div>
	),
};

/**
 * The thumb slides on a 120ms transition, which is suppressed under
 * `prefers-reduced-motion: reduce` — the state change still happens, it just
 * does not animate.
 */
export const Motion: Story = {
	args: { label: 'Click to see the thumb travel 20px' },
};
