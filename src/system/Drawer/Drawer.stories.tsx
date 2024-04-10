/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Drawer, Root, Trigger, Content } from './Drawer';
import { Button } from '..';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'Navigation/Drawer',
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
- You can use the \`variant\` prop to change the position of the  The default is \`left\`. Other options are: \`top\`, \`right\`, \`bottom\`.
- You can pass some styles to the Drawer using the \`sx\` prop. It will be attached o the Content component. This is useful to change the width of the

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
			<Drawer
				label="My XYZ Dialog"
				trigger={ <Button>Open </Button> }
				dimensions={ { width: 320 } }
			>
				<p sx={ { ml: 3 } }>Hello from default</p>
			</Drawer>

			<Drawer trigger={ <Button>Top</Button> } variant="top" label="Dialog Content">
				<p sx={ { ml: 3 } }>Hello from top</p>
			</Drawer>
			<Drawer
				trigger={ <Button>Right</Button> }
				variant="right"
				label="Dialog"
				dimensions={ { width: 500 } }
			>
				<p sx={ { ml: 3 } }>Hello from right width 500px</p>
			</Drawer>
			<Drawer
				trigger={ <Button>Bottom</Button> }
				variant="bottom"
				label="Dialog"
				dimensions={ { height: 200 } }
			>
				<p sx={ { ml: 3 } }>Hello from bottom with 200px</p>
			</Drawer>
			<Drawer
				trigger={ <Button>Left</Button> }
				variant="left"
				label="Dialog"
				dimensions={ { width: 600 } }
			>
				<p sx={ { ml: 3 } }>Hello from left width 600px</p>
			</Drawer>
			<Drawer trigger={ <Button>Left Header</Button> } variant="left-header" label="Dialog">
				<p sx={ { ml: 3 } }>Hello from left header (VIP Dashboard needs)</p>
			</Drawer>
			<Drawer trigger={ <Button>Right Header</Button> } variant="left-header" label="Dialog">
				<p sx={ { ml: 3 } }>Hello from right header (VIP Dashboard needs)</p>
			</Drawer>
		</>
	),
};

export const ByParts: Story = {
	render: () => (
		<>
			<Root>
				<Trigger>
					<Button>Open </Button>
				</Trigger>
				<Content dimensions={ { width: 320 } } label="My XYZ Dialog">
					<p sx={ { ml: 3 } }>Hello from default</p>
				</Content>
			</Root>
		</>
	),
};
