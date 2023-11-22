/** @jsxImportSource theme-ui */
import React from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from './Drawer';
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
			<Drawer>
				<DrawerTrigger asChild>
					<Button>Open Drawer</Button>
				</DrawerTrigger>
				<DrawerContent sx={ { width: 320 } }>
					<p sx={ { ml: 3 } }>Hello from default</p>
				</DrawerContent>
			</Drawer>

			<Drawer>
				<DrawerTrigger asChild>
					<Button>Top</Button>
				</DrawerTrigger>
				<DrawerContent variant="top">
					<p sx={ { ml: 3 } }>Hello from top</p>
				</DrawerContent>
			</Drawer>
			<Drawer>
				<DrawerTrigger asChild>
					<Button>Right</Button>
				</DrawerTrigger>
				<DrawerContent variant="right">
					<p sx={ { ml: 3 } }>Hello from right</p>
				</DrawerContent>
			</Drawer>
			<Drawer>
				<DrawerTrigger asChild>
					<Button>Bottom</Button>
				</DrawerTrigger>
				<DrawerContent variant="bottom">
					<p sx={ { ml: 3 } }>Hello from bottom</p>
				</DrawerContent>
			</Drawer>
			<Drawer>
				<DrawerTrigger asChild>
					<Button>Left</Button>
				</DrawerTrigger>
				<DrawerContent variant="left">
					<p sx={ { ml: 3 } }>Hello from left</p>
				</DrawerContent>
			</Drawer>
		</>
	),
};
