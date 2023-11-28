/** @jsxImportSource theme-ui */
import React from 'react';

import * as Drawer from './Drawer';
import { Button } from '..';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'Drawer',
	component: Drawer,
	parameters: {
		docs: {
			description: {
				component: `
The Drawer component is a navigation component that is hidden by default and can be toggled open and closed. It opens a panel that can contain any content. The base of this component is a Dialog.

## Guidance

### When to use the Drawer component

- Use the Drawer component when you want to hide content that is not essential to the user experience. The Drawer component is a good choice for navigation menus, settings panels, and other non-essential content.
- The VIP Dashboard uses this component to help users with some Responsive behavior.

### When to consider something else

- For essencial content, use other components.

## Accessibility Considerations guidance

- The Drawer is based on the Dialog component and inherits all of its accessibility considerations.
- The trigger should be a button
- The focus gets back to the trigger when the Drawer is closed
- The Drawer should be closed when the Escape key is pressed
- The Drawer should be closed when the overlay is clicked
- The Drawer should be closed when the focus moves outside of the Drawer
- The Drawer has a close button that should be used to close the Drawer

## Using the component

- Look at the examples below to see how the Drawer component is used.
- You can use the \`variant\` prop to change the position of the Drawer. The default is \`left\`. Other options are: \`top\`, \`right\`, \`bottom\`.
- You can pass some styles to the Drawer using the \`sx\` prop. It will be attached o the Content component. This is useful to change the width of the Drawer.

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Drawer >;

export const Default: Story = {
	render: () => (
		<>
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Open Drawer.</Button>
				</Drawer.Trigger>
				<Drawer.Content sx={ { width: 320 } }>
					<p sx={ { ml: 3 } }>Hello from default</p>
				</Drawer.Content>
			</Drawer.Root>

			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Top</Button>
				</Drawer.Trigger>
				<Drawer.Content variant="top">
					<p sx={ { ml: 3 } }>Hello from top</p>
				</Drawer.Content>
			</Drawer.Root>
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Right</Button>
				</Drawer.Trigger>
				<Drawer.Content variant="right">
					<p sx={ { ml: 3 } }>Hello from right</p>
				</Drawer.Content>
			</Drawer.Root>
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Bottom</Button>
				</Drawer.Trigger>
				<Drawer.Content variant="bottom">
					<p sx={ { ml: 3 } }>Hello from bottom</p>
				</Drawer.Content>
			</Drawer.Root>
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Left</Button>
				</Drawer.Trigger>
				<Drawer.Content variant="left">
					<p sx={ { ml: 3 } }>Hello from left</p>
				</Drawer.Content>
			</Drawer.Root>
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Left Header</Button>
				</Drawer.Trigger>
				<Drawer.Content variant="left-header">
					<p sx={ { ml: 3 } }>Hello from left header (VIP Dashboard needs)</p>
				</Drawer.Content>
			</Drawer.Root>
			<Drawer.Root>
				<Drawer.Trigger asChild>
					<Button>Right Header</Button>
				</Drawer.Trigger>
				<Drawer.Content variant="left-header">
					<p sx={ { ml: 3 } }>Hello from right header (VIP Dashboard needs)</p>
				</Drawer.Content>
			</Drawer.Root>
		</>
	),
};
