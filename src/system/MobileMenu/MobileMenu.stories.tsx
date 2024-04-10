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
import { MdOutlinePhotoLibrary } from 'react-icons/md';

import { MobileMenu, MobileMenuTrigger, MobileMenuWrapper } from './MobileMenu';
import { Nav, NavItem } from '..';
import { CustomLink } from '../utils/stories/CustomLink';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'Navigation/MobileMenu',
	component: MobileMenu,
	parameters: {
		docs: {
			description: {
				component: `
The MobileMenu component is a navigation component that is hidden by default and can be toggled open and closed. It opens a panel that can contain any content. The base of this component is a Drawer.

## Guidance

### When to use the Drawer component

- Use the MobileMenu component to displaying a drawer with mobile content.

### When to consider something else

- If you need something that is not a menu on a mobile view, consider using another component.

## Accessibility Considerations guidance

- The MobileMenu is based on the Drawer component and inherits all of its accessibility considerations.

## Using the component

- Look at the examples below to see how the MobileMenu component is used.
- You can use the \`toolbarItems\` prop to pass the content that will be in the header
- You can pass \`display\` prop to the MobileMenuTrigger to control the display of the trigger. The array must match the ThemeUI breakpoints.

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof MobileMenu >;

export const MobileMenuExample = () => (
	<MobileMenuWrapper>
		<MobileMenuTrigger label="Menu" variant="primary" display={ [ 'flex', 'flex', 'flex' ] } />
		<MobileMenu
			toolbarItems={
				<>
					<NavItem.MenuInverse href="/apps" active as={ CustomLink }>
						My Applications
					</NavItem.MenuInverse>

					<NavItem.MenuInverse href="/orgs" as={ CustomLink }>
						My Organizations
					</NavItem.MenuInverse>
				</>
			}
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

				<NavItem.MenuGroup active label="Logs" renderIcon={ size => <BiHistory size={ size } /> }>
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
		</MobileMenu>
	</MobileMenuWrapper>
);

export const Default: Story = {
	render: () => (
		<>
			<MobileMenuExample />
		</>
	),
};
