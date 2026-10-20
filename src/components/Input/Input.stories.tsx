import type { Meta, StoryObj } from '@storybook/react';

import '../../css/index.css';

function Icon({ name }: { name: string }) {
	return (
		<svg className="icon" aria-hidden="true">
			<use href={`/dist/sprite.svg#${name}`} />
		</svg>
	);
}

/**
 * One block serves **input, textarea and select**. All three use the same
 * `-input/*` token set in Figma, so they are variants of one thing rather than
 * three components:
 *
 * ```html
 * <div class="input">
 *   <label class="input__label type-support-label-default" for="email">Email</label>
 *   <input id="email" class="input__field type-body-default" type="email">
 *   <p class="input__helper type-support-helper-text">
 *     <svg class="icon" aria-hidden="true"><use href="#bx-info-circle"></use></svg>
 *     We'll never share it
 *   </p>
 * </div>
 * ```
 *
 * ### States
 *
 * `data-state` on the wrapper takes `error`, `disabled` and `read-only`. Use
 * the native `disabled` and `readonly` attributes too — the CSS matches either,
 * but only the attribute changes behaviour.
 *
 * ### Helper text
 *
 * The helper takes an icon in both states: `bx-info-circle` when neutral,
 * `bx-error-circle` when the field is invalid. The icon is **12px**, not
 * `1cap` — it pairs with 12px helper text rather than running copy, and Figma
 * sizes it explicitly. That's set through the `--icon-size` hook.
 *
 * ### Announcing errors
 *
 * `data-state="error"` is styling only. Wire the field to its message with
 * `aria-describedby` and mark it `aria-invalid="true"`, or the error is
 * visible but not announced.
 */
const meta: Meta<InputArgs> = {
	title: 'Blocks/Input',
	tags: ['autodocs'],
	argTypes: {
		state: { control: 'inline-radio', options: ['default', 'error', 'disabled', 'read-only'] },
		label: { control: 'text' },
		placeholder: { control: 'text' },
		helper: { control: 'text' },
	},
	args: {
		state: 'default',
		label: 'Email address',
		placeholder: 'Type your input here …',
		helper: 'Helper text',
	},
	render: (args) => <Input {...args} />,
};

type InputArgs = {
	state: 'default' | 'error' | 'disabled' | 'read-only';
	label: string;
	placeholder: string;
	helper: string;
};

function Input({ state, label, placeholder, helper }: InputArgs) {
	const isError = state === 'error';
	const id = `input-${state}`;
	const helperId = `${id}-helper`;
	return (
		<div
			className="input"
			data-state={state === 'default' ? undefined : state}
			style={{ maxWidth: 360 }}
		>
			<label className="input__label type-support-label-default" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className="input__field type-body-default"
				type="text"
				placeholder={placeholder}
				disabled={state === 'disabled'}
				readOnly={state === 'read-only'}
				defaultValue={state === 'read-only' ? 'This is a read-only field' : undefined}
				aria-invalid={isError || undefined}
				aria-describedby={helper ? helperId : undefined}
			/>
			{helper && (
				<p id={helperId} className="input__helper type-support-helper-text">
					<Icon name={isError ? 'bx-error-circle' : 'bx-info-circle'} />
					{helper}
				</p>
			)}
		</div>
	);
}

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {};

/** Every state the field can be in. */
export const States: Story = {
	render: () => (
		<div
			className="stack"
			style={{ ['--stack-gap' as string]: 'var(--space-comfortable)', maxWidth: 360 }}
		>
			<Input
				state="default"
				label="Default"
				placeholder="Type your input here …"
				helper="Helper text"
			/>
			<Input
				state="error"
				label="Error"
				placeholder="Type your input here …"
				helper="Error message"
			/>
			<Input state="disabled" label="Disabled" placeholder="Disabled" helper="" />
			<Input state="read-only" label="Read only" placeholder="" helper="Helper text" />
		</div>
	),
};

/**
 * A textarea uses the same classes. The block releases the fixed 40px height
 * for `textarea` so it grows with its `rows`.
 */
export const Textarea: Story = {
	render: () => (
		<div className="input" style={{ maxWidth: 360 }}>
			<label className="input__label type-support-label-default" htmlFor="ta">
				Description
			</label>
			<textarea
				id="ta"
				className="input__field type-body-default"
				rows={4}
				placeholder="Type your input here …"
			/>
			<p className="input__helper type-support-helper-text">
				<Icon name="bx-info-circle" />
				Markdown is supported
			</p>
		</div>
	),
};

/**
 * A select uses the same classes, wrapped in `.input__control` so the chevron
 * has somewhere to live — a `<select>` is a replaced element and cannot carry
 * a pseudo-element of its own.
 *
 * **This is the closed state only.** The open dropdown is drawn by the
 * operating system and cannot be styled, so it will not match the design.
 * Matching it needs a custom listbox, which is a separate component with real
 * keyboard and ARIA surface.
 */
export const Select: Story = {
	render: () => (
		<div className="input" style={{ maxWidth: 360 }}>
			<label className="input__label type-support-label-default" htmlFor="sel">
				Environment
			</label>
			<div className="input__control">
				<select id="sel" className="input__field type-body-default">
					<option>Production</option>
					<option>Staging</option>
					<option>Development</option>
				</select>
			</div>
		</div>
	),
};

/**
 * A secondary label sits inline after the main one, with an optional smaller
 * note after that — "(Required)", "(Optional)".
 */
export const LabelVariants: Story = {
	render: () => (
		<div className="input" style={{ maxWidth: 360 }}>
			<label
				className="input__label type-support-label-default cluster"
				htmlFor="lv"
				style={{ ['--cluster-gap' as string]: 'var(--space-micro)' }}
			>
				Label
				<span className="input__label-secondary type-body-default">(Secondary Label)</span>
				<span className="input__label-note type-support-helper-text">(Required)</span>
			</label>
			<input
				id="lv"
				className="input__field type-body-default"
				type="text"
				placeholder="Type your input here …"
			/>
		</div>
	),
};
