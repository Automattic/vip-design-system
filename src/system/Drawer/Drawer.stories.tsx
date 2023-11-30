/** @jsxImportSource theme-ui */

import { AiOutlineLock } from 'react-icons/ai';
import {
	BiBell,
	BiBulb,
	BiCodeAlt,
	BiData,
	BiGridAlt,
	BiHistory,
	BiTachometer,
	BiWindows,
} from 'react-icons/bi';
import { MdMenu, MdOutlinePhotoLibrary } from 'react-icons/md';

import { Drawer, Root, Trigger, Content } from './Drawer';
import { Box, Button, Flex, Nav, NavItem } from '..';
import { Logo } from '../Toolbar/Logo';
import { CustomLink } from '../utils/stories/CustomLink';

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
			<Drawer label="My XYZ Dialog" trigger={ <Button>Open Drawer.</Button> } sx={ { width: 320 } }>
				<p sx={ { ml: 3 } }>Hello from default</p>
			</Drawer>

			<Drawer trigger={ <Button>Top</Button> } variant="top" label="Dialog Content">
				<p sx={ { ml: 3 } }>Hello from top</p>
			</Drawer>
			<Drawer trigger={ <Button>Right</Button> } variant="right" label="Dialog">
				<p sx={ { ml: 3 } }>Hello from right</p>
			</Drawer>
			<Drawer trigger={ <Button>Bottom</Button> } variant="bottom" label="Dialog">
				<p sx={ { ml: 3 } }>Hello from bottom</p>
			</Drawer>
			<Drawer trigger={ <Button>Left</Button> } variant="left" label="Dialog">
				<p sx={ { ml: 3 } }>Hello from left</p>
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
				<Trigger asChild>
					<Button>Open Drawer.</Button>
				</Trigger>
				<Content sx={ { width: 320 } } label="My XYZ Dialog">
					<p sx={ { ml: 3 } }>Hello from default</p>
				</Content>
			</Root>
		</>
	),
};

export const VIPMobileMenu: Story = {
	render: () => (
		<>
			<Drawer
				trigger={
					<Button
						type="button"
						variant="tertiary"
						sx={ {
							display: 'flex',
							alignItems: 'center',
							fontSize: 2,
							gap: 1,
							mx: 2,
						} }
					>
						Menu
						<MdMenu
							size={ 24 }
							sx={ {
								mt: ( theme: { space: number[] } ) => `${ theme?.space?.[ 1 ] / 2 }px`,
							} }
						/>
					</Button>
				}
				label="Dialog X"
				variant="left"
				sx={ {
					width: 320,
					backgroundColor: 'toolbar.background',
					boxShadow: 'none',
				} }
			>
				<div
					sx={ {
						height: 56,
						width: '100%',
						p: 4,
						px: 5,
					} }
				>
					<Logo />
				</div>

				<div
					sx={ {
						overflowX: 'hidden',
						overflowY: 'auto',
						height: 'calc(100vh - 56px)',
						display: 'flex',
						flex: 1,
					} }
				>
					<Flex sx={ { width: '100%', flexDirection: 'column' } }>
						<Nav.Primary label="Main Links" orientation="vertical" sx={ { p: 4 } }>
							<NavItem.MenuInverse href="/apps" active as={ CustomLink }>
								My Applications
							</NavItem.MenuInverse>

							<NavItem.MenuInverse href="/orgs" as={ CustomLink }>
								My Organizations
							</NavItem.MenuInverse>
						</Nav.Primary>

						<Box
							sx={ {
								alignSelf: 'stretch',
								backgroundColor: 'layer.1',
								minHeight: `calc(100vh - 56px)`,
								pt: 2,
								px: 4,
								width: '100%',
								a: {
									border: 'none',
								},
							} }
						>
							<Nav.Menu sx={ { mb: 4 } } label="Nav Menu">
								<NavItem.Menu
									href="https://wordpress.com"
									renderIcon={ size => <BiGridAlt size={ size } /> }
									as={ CustomLink }
								>
									Overview
								</NavItem.Menu>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <BiWindows size={ size } /> }
								>
									Network Sites
								</NavItem.Menu>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <AiOutlineLock size={ size } /> }
								>
									Domains & TLS
								</NavItem.Menu>

								<NavItem.MenuGroup
									active
									label="Logs"
									renderIcon={ size => <BiHistory size={ size } /> }
								>
									<NavItem.Menu active as={ CustomLink } href="https://google.com/">
										Audit
									</NavItem.Menu>
									<NavItem.Menu as={ CustomLink } href="https://wpvip.com/">
										Runtime
									</NavItem.Menu>
									<NavItem.Menu as={ CustomLink } href="https://dashboard.wpvip.com/">
										Slow Query
									</NavItem.Menu>
								</NavItem.MenuGroup>

								<NavItem.MenuGroup
									label="Performance"
									renderIcon={ size => <BiTachometer size={ size } /> }
								>
									<NavItem.Menu as={ CustomLink } href="https://random-website.com/">
										Metrics
									</NavItem.Menu>
									<NavItem.Menu as={ CustomLink } href="https://random-website.com/">
										Monitor
									</NavItem.Menu>
									<NavItem.Menu as={ CustomLink } href="https://random-website.com/">
										Cache
									</NavItem.Menu>
								</NavItem.MenuGroup>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <BiCodeAlt size={ size } /> }
								>
									Code [v]
								</NavItem.Menu>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <BiData size={ size } /> }
								>
									Database [v]
								</NavItem.Menu>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <MdOutlinePhotoLibrary size={ size } /> }
								>
									Media [v]
								</NavItem.Menu>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <BiBell size={ size } /> }
								>
									Notifications
								</NavItem.Menu>
								<NavItem.Menu
									as={ CustomLink }
									href="https://random-website.com/"
									renderIcon={ size => <BiBulb size={ size } /> }
								>
									Features
								</NavItem.Menu>
							</Nav.Menu>
						</Box>
					</Flex>
				</div>
			</Drawer>
		</>
	),
};
