import { AiOutlineLock } from 'react-icons/ai';
import {
	BiBulb,
	BiCodeAlt,
	BiData,
	BiHistory,
	BiGridAlt,
	BiTachometer,
	BiWindows,
	BiBell,
} from 'react-icons/bi';
import { MdOutlinePhotoLibrary } from 'react-icons/md';

import { Nav } from './Nav';
import { NavItem } from './NavItem';
import { CustomLink } from '../utils/stories/CustomLink';

import type { StoryObj } from '@storybook/react';

export default {
	title: 'Navigation/Nav',
	component: Nav,
	parameters: {
		docs: {
			description: {
				component: `
A navigation menu is a list of links used to navigate a website. It is usually placed in a prominent position at the top of a site, or anywhere that needs a linked-navigation.

## Guidance

### When to use the Nav component

- To link internal or external links in a menu format.
- To link to pages that are not part of the main navigation.

### When to consider something else

- If you have content inside the same page that will not affect the page Route/URL, use [Tabs](/docs/tabs--docs) component instead.
- If you are planning to have buttons in your navigation, use another navigation solution, for example: [Dropdown](/docs/dropdown--docs) component instead.
- **We don't recommend you to use the Nav.Toolbar in any other place than the [Toolbar](/docs/navigation-toolbar--docs) component.**

## Accessibility Considerations guidance

This component is based on the Radix Navigation Menu primitive, so it contains all the accessibility features from the primitive.

- Adheres to the [navigation role requirements.](https://www.w3.org/TR/wai-aria-1.2/#navigation)
- Keyboard Interactions: https://www.radix-ui.com/primitives/docs/components/navigation-menu#keyboard-interactions

## Using the component

Pick one of the available variants: Primary, Tabs or Menu. You can use the components directly from the \`Nav\` component:

~~~jsx filename="index.jsx"
import { Nav, NavItem } from '@automattic/components';

<Nav.Primary> or <Nav.Tab>
<NavItem.Primary> or <NavItem.Tab>
~~~

### Usage with Next.js or other frameworks

~~~jsx filename="index.jsx"
import Link from 'next/link';

<Nav.Primary label="Etc">
	<NavItem.Primary
		active
		href="https://google.com"
		as={ Link } // We required you to pass the link component you want to use. This will apply the proper styles.
	>
		Your page name
	</NavItem.Primary>
</Nav.Primary>
~~~

-------

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Nav >;

export const Default: Story = {
	render: () => (
		<>
			<p>
				<strong>Variant: Primary</strong>
			</p>
			<Nav.Primary sx={ { mb: 4 } } label="Nav Primary">
				<NavItem.Primary active as={ CustomLink } href="https://random-website.com/">
					PHP
				</NavItem.Primary>
				<NavItem.Primary as={ CustomLink } href="https://wordpress.com">
					WordPress
				</NavItem.Primary>
				<NavItem.Primary as={ CustomLink } href="https://newrelic.com/">
					New Relic
				</NavItem.Primary>
				<NavItem.Primary disabled as={ CustomLink } href="https://google.com/">
					Not accessible
				</NavItem.Primary>
			</Nav.Primary>
		</>
	),
};

export const Tab: Story = {
	render: () => (
		<>
			<p>
				<strong>Variant: Tab</strong>
			</p>
			<Nav.Tab sx={ { mb: 4 } } label="Nav Tab">
				<NavItem.Tab active as={ CustomLink } href="https://random-website.com/">
					PHP
				</NavItem.Tab>
				<NavItem.Tab as={ CustomLink } href="https://wordpress.com">
					WordPress
				</NavItem.Tab>
				<NavItem.Tab as={ CustomLink } href="https://newrelic.com/">
					New Relic
				</NavItem.Tab>
				<NavItem.Tab disabled as={ CustomLink } href="https://google.com/">
					Not accessible
				</NavItem.Tab>
			</Nav.Tab>
		</>
	),
};

export const Menu: Story = {
	render: () => (
		<>
			<p>
				<strong>Variant: Menu</strong>. This menu takes full width by default. You can put it in a
				container with constrained width..
			</p>

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
					activeChildren
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
		</>
	),
};

export const MenuInverse: Story = {
	render: () => (
		<>
			<p>
				<strong>Variant: Menu</strong>. This menu takes full width by default. You can put it in a
				container with constrained width..
			</p>

			<Nav.Toolbar label="Main" orientation="vertical">
				<NavItem.MenuInverse active href="https://googles.com" as={ CustomLink }>
					My Applications
				</NavItem.MenuInverse>
				{ /* Example below if you have Next.js <Link /> */ }
				<NavItem.MenuInverse href="https://google.com" as={ CustomLink }>
					Custom Link
				</NavItem.MenuInverse>
			</Nav.Toolbar>
		</>
	),
};
