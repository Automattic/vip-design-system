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

import { Nav, NavItem, Box } from '../../system';

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

### Usability guidance

Pick one of the available variants: Primary or Tabs. You can use the components directly from the \`Nav\` component:

~~~jsx filename="index.jsx"
import { Nav, NavItem } from '@automattic/components';

<Nav.Primary> or <Nav.Tab>
<NavItem.Primary> or <NavItem.Tab>
~~~

### Usage with Next.js framwork

~~~jsx filename="index.jsx"
import Link from 'next/link';

<Nav.Primary label="Etc">
	<NavItem.Primary
		active
		href="https://google.com"
		asChild // This is important to pass the link styles to the child
	>
		<Link href={ \`/orgs/\${ id }/sso/configurations/\${ idP }/edit/\${ tab.path }\` }>
			Your page name
		</Link>
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
				<NavItem.Primary active href="#">
					PHP
				</NavItem.Primary>
				<NavItem.Primary href="https://wordpress.com">WordPress</NavItem.Primary>
				<NavItem.Primary href="https://newrelic.com/">New Relic</NavItem.Primary>
				<NavItem.Primary disabled href="https://google.com/">
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
				<NavItem.Tab active href="#">
					PHP
				</NavItem.Tab>
				<NavItem.Tab href="https://wordpress.com">WordPress</NavItem.Tab>
				<NavItem.Tab href="https://newrelic.com/">New Relic</NavItem.Tab>
				<NavItem.Tab disabled href="https://google.com/">
					Not accessible
				</NavItem.Tab>
			</Nav.Tab>
		</>
	),
};
export const Toolbar: Story = {
	render: () => (
		<>
			<p>
				<strong>Variant: Toolbar</strong>. This variant is used inside the Toolbar component.
				Currently there is no use case for this variant outside the Toolbar component.
			</p>

			<Box sx={ { p: 6, backgroundColor: 'toolbar.background' } }>
				<Nav.Toolbar sx={ { mb: 4 } } label="Nav Toolbar">
					<NavItem.Toolbar active href="#">
						PHP
					</NavItem.Toolbar>
					<NavItem.Toolbar href="https://wordpress.com">WordPress</NavItem.Toolbar>
					<NavItem.Toolbar href="https://newrelic.com/">New Relic</NavItem.Toolbar>
					<NavItem.Toolbar disabled href="https://google.com/">
						Not accessible
					</NavItem.Toolbar>
				</Nav.Toolbar>
			</Box>
		</>
	),
};

// eslint-disable-next-line jsx-a11y/anchor-has-content
const CustomLink = props => <a { ...props } />;

export const Menu: Story = {
	render: () => (
		<>
			<p>
				<strong>Variant: Menu</strong>.
			</p>

			<Nav.Menu sx={ { mb: 4, width: 250 } } label="Nav Menu">
				<NavItem.Menu
					href="https://wordpress.com"
					icon={ <BiGridAlt size={ 20 } /> }
					render={ CustomLink }
				>
					Overview
				</NavItem.Menu>
				<NavItem.Menu active href="#" icon={ <BiWindows size={ 20 } /> }>
					Network Sites
				</NavItem.Menu>
				<NavItem.Menu href="#" icon={ <AiOutlineLock size={ 20 } /> }>
					Domains & TLS
				</NavItem.Menu>

				<NavItem.MenuGroup label="Logs" icon={ <BiHistory size={ 20 } /> }>
					<NavItem.Menu render={ CustomLink } href="https://google.com/">
						Audit
					</NavItem.Menu>
					<NavItem.Menu render={ CustomLink } active href="https://wpvip.com/">
						Runtime
					</NavItem.Menu>
					<NavItem.Menu render={ CustomLink } href="https://dashboard.wpvip.com/">
						Slow Query
					</NavItem.Menu>
				</NavItem.MenuGroup>

				<NavItem.MenuGroup label="Performance" icon={ <BiTachometer size={ 20 } /> }>
					<NavItem.Menu href="#">Metrics</NavItem.Menu>
					<NavItem.Menu href="#">Monitor</NavItem.Menu>
					<NavItem.Menu href="#">Cache</NavItem.Menu>
				</NavItem.MenuGroup>
				<NavItem.Menu href="#" icon={ <BiCodeAlt size={ 20 } /> }>
					Code [v]
				</NavItem.Menu>
				<NavItem.Menu href="#" icon={ <BiData size={ 20 } /> }>
					Database [v]
				</NavItem.Menu>
				<NavItem.Menu href="#" icon={ <MdOutlinePhotoLibrary size={ 20 } /> }>
					Media [v]
				</NavItem.Menu>
				<NavItem.Menu href="#" icon={ <BiBell size={ 20 } /> }>
					Notifications
				</NavItem.Menu>
				<NavItem.Menu href="#" icon={ <BiBulb size={ 20 } /> }>
					Features
				</NavItem.Menu>
			</Nav.Menu>
		</>
	),
};
