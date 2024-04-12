/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Toggle, Label } from '..';
export default {
	title: 'Toggle',
	component: Toggle,
	argTypes: {
		checked: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The Toggle component is two-state switch that can be toggled on or off. It is used to activate or deactivate a feature.

## Guidance

### When to use the Toggle component

- Use the Toggle component to allow users to switch between two states, such as on/off, true/false, or yes/no.

### When to consider something else

- If you need to select from more than two states, use a [Radio](/docs/radio--docs), or a [Select](/docs/form-select--docs) component instead.

## Accessibility Considerations guidance

- The Toggle component is based on the Radix Toggle primitive, so it contains all the accessibility features from the primitive.

## Using the component

- Available variants: Primary, Success, Disabled.

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Toggle >;

export const Default: Story = {
	render: args => (
		<form>
			<Toggle checked={ args.checked } defaultChecked aria-label="Feature flag" />

			<br />
			<br />

			<Toggle checked={ args.checked } defaultChecked={ false } aria-label="Feature flag 2" />

			<br />
			<br />

			<Toggle aria-label="Feature Disabled" disabled defaultChecked={ false } />
		</form>
	),
};

export const WithLabel: Story = {
	render: args => (
		<form>
			<Label htmlFor="custom-label-input">Custom Label here</Label>

			<Toggle
				id="custom-label-input"
				defaultChecked
				checked={ args.checked }
				aria-label="Feature flag"
			/>
		</form>
	),
};

export const CustomStyling: Story = {
	render: args => (
		<form>
			<Label htmlFor="custom-label-input">
				Custom Styling.{ ' ' }
				<strong>We currently only recommend using Primary, Disabled, and Success variants.</strong>
			</Label>

			<div>
				<Toggle
					id="custom-label-input"
					defaultChecked
					checked={ args.checked }
					aria-label="Feature flag"
					variant="success"
				/>{ ' ' }
				<h2>Not recommended</h2>
				<Toggle
					id="custom-label-input-error"
					defaultChecked
					checked={ args.checked }
					aria-label="Error flag"
					variant="error"
				/>{ ' ' }
				<Toggle
					id="custom-label-input-warning"
					defaultChecked
					checked={ args.checked }
					aria-label="Warning flag"
					variant="warning"
				/>{ ' ' }
				<Toggle
					id="custom-label-input-info"
					defaultChecked
					checked={ args.checked }
					aria-label="info flag"
					variant="info"
				/>
			</div>
		</form>
	),
};
