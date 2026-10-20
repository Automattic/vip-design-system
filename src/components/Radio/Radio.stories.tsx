import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

/**
 * A radio is a **native `<input type="radio">`** with `.radio` on it. There is
 * no React component and no wrapper element:
 *
 * ```html
 * <label class="cluster">
 *   <input type="radio" class="radio" name="plan"> Monthly
 * </label>
 * ```
 *
 * Grouping, arrow-key navigation and roving focus all come from the shared
 * `name` attribute — the browser handles them, so no ARIA or key handling is
 * needed. Give every radio in a group the same `name`, and wrap the group in a
 * `<fieldset>` with a `<legend>` so the question is announced with the options.
 *
 * ### Two notes where this departs from the design file
 *
 * **Size.** Figma specifies 17×17 for radio where checkbox is 16×16. That is
 * reproduced as drawn, but it is worth a look if the two ever sit together in
 * one form.
 *
 * **Hover.** Figma has no hover state for radio, though it does for checkbox.
 * The hover here is carried over from the previous implementation rather than
 * dropped — removing the only pointer affordance from a control isn't
 * something the design file is actually asking for — and it now uses the same
 * `--color-border-control-hover` the checkbox does.
 */
const meta: Meta<RadioArgs> = {
	title: 'Blocks/Radio',
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
	},
	args: { checked: false, disabled: false, label: 'Monthly' },
	render: (args) => <Radio {...args} name="single" />,
};

type RadioArgs = { checked: boolean; disabled: boolean; label: string };

function Radio({ checked, disabled, label, name }: RadioArgs & { name: string }) {
	return (
		<label className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			<input
				type="radio"
				className="radio"
				name={name}
				defaultChecked={checked}
				disabled={disabled}
			/>
			<span className="type-support-label-default">{label}</span>
		</label>
	);
}

export default meta;
type Story = StoryObj<RadioArgs>;

export const Default: Story = {};

/** Every state the control can be in. */
export const States: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-close)' }}>
			<Radio checked={false} disabled={false} label="Unselected" name="a" />
			<Radio checked disabled={false} label="Selected" name="b" />
			<Radio checked={false} disabled label="Unselected, disabled" name="c" />
			<Radio checked disabled label="Selected, disabled" name="d" />
		</div>
	),
};

/**
 * A real group. The shared `name` makes the browser enforce single selection
 * and move focus with the arrow keys; `fieldset` and `legend` tie the options
 * to the question they answer.
 */
export const Group: Story = {
	render: () => (
		<fieldset style={{ border: 'none', padding: 0 }}>
			<legend className="type-support-label-default" style={{ paddingInline: 0 }}>
				Billing period
			</legend>
			<div
				className="stack"
				style={{
					['--stack-gap' as string]: 'var(--space-close)',
					marginBlockStart: 'var(--space-close)',
				}}
			>
				<Radio checked disabled={false} label="Monthly" name="plan" />
				<Radio checked={false} disabled={false} label="Annually" name="plan" />
				<Radio checked={false} disabled label="Lifetime (unavailable)" name="plan" />
			</div>
		</fieldset>
	),
};
