import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

import '../../css/index.css';

/**
 * A checkbox is a **native `<input type="checkbox">`** with `.checkbox` on it.
 * There is no React component and no wrapper element:
 *
 * ```html
 * <label class="with-icon">
 *   <input type="checkbox" class="checkbox"> Remember me
 * </label>
 * ```
 *
 * All state comes from the native attributes — `checked`, `disabled`, and the
 * `indeterminate` property, which HTML can only set from JavaScript. Styling
 * follows via `:checked`, `:disabled` and `:indeterminate`, so the control
 * stays keyboard-operable and announces correctly without any extra ARIA.
 *
 * ### The mark
 *
 * The tick and the indeterminate dash are drawn on a `::before`, masked to the
 * shape and filled with `--checkbox-foreground`. The more common approach — a
 * `background-image` data URI — can't work here: a data URI has to carry its
 * own `fill`, and that fill can't reference a custom property. Masking keeps
 * the mark themeable.
 */
const meta: Meta<CheckboxArgs> = {
	title: 'Blocks/Checkbox',
	tags: ['autodocs'],
	argTypes: {
		checked: { control: 'boolean' },
		indeterminate: { control: 'boolean', description: 'Set via JS; HTML has no attribute.' },
		disabled: { control: 'boolean' },
		label: { control: 'text' },
	},
	args: { checked: false, indeterminate: false, disabled: false, label: 'Remember me' },
	render: (args) => <Checkbox {...args} />,
};

type CheckboxArgs = {
	checked: boolean;
	indeterminate: boolean;
	disabled: boolean;
	label: string;
};

function Checkbox({ checked, indeterminate, disabled, label }: CheckboxArgs) {
	const ref = useRef<HTMLInputElement>(null);
	// indeterminate is a property, not an attribute — React can't set it declaratively.
	useEffect(() => {
		if (ref.current) {
			ref.current.indeterminate = indeterminate;
		}
	}, [indeterminate]);

	return (
		<label className="cluster" style={{ ['--cluster-gap' as string]: 'var(--space-close)' }}>
			<input
				ref={ref}
				type="checkbox"
				className="checkbox"
				defaultChecked={checked}
				disabled={disabled}
			/>
			<span className="type-support-label-default">{label}</span>
		</label>
	);
}

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {};

/** Every state the control can be in. */
export const States: Story = {
	render: () => (
		<div className="stack" style={{ ['--stack-gap' as string]: 'var(--space-close)' }}>
			<Checkbox checked={false} indeterminate={false} disabled={false} label="Unchecked" />
			<Checkbox checked indeterminate={false} disabled={false} label="Checked" />
			<Checkbox checked={false} indeterminate disabled={false} label="Indeterminate" />
			<Checkbox checked={false} indeterminate={false} disabled label="Unchecked, disabled" />
			<Checkbox checked indeterminate={false} disabled label="Checked, disabled" />
			<Checkbox checked={false} indeterminate disabled label="Indeterminate, disabled" />
		</div>
	),
};

/**
 * Indeterminate is the "some but not all" state for a parent controlling a
 * group. It is a DOM property with no HTML attribute, so it can only be set
 * from script — and it is purely visual: the input's `checked` value is
 * unaffected.
 */
export const Indeterminate: Story = {
	args: { indeterminate: true, label: 'Some options selected' },
};
