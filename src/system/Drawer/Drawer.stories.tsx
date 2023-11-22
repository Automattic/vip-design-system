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

- TBD

### When to consider something else

- TBD

## Accessibility Considerations guidance

- TBD

## Using the component

- TBD

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
