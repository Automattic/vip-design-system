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
The Toggle component is a navigation component that is hidden by default and can be toggled open and closed. It opens a panel that can contain any content. The base of this component is a Drawer.

## Guidance

### When to use the Drawer component

- Use the Toggle component to displaying a drawer with mobile content.

### When to consider something else

- If you need something that is not a menu on a mobile view, consider using another component.

## Accessibility Considerations guidance

- The Toggle is based on the Drawer component and inherits all of its accessibility considerations.

## Using the component

- Look at the examples below to see how the Toggle component is used.
- You can use the \`toolbarItems\` prop to pass the content that will be in the header
- You can pass \`display\` prop to the ToggleTrigger to control the display of the trigger. The array must match the ThemeUI breakpoints.

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
			<Label htmlFor="custom-label-input">Custom Styling</Label>

			<div>
				<Toggle
					id="custom-label-input"
					defaultChecked
					checked={ args.checked }
					aria-label="Feature flag"
					variant="success"
				/>{ ' ' }
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
