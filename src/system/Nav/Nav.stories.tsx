/**
 * Internal dependencies
 */

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
				<NavItem.Primary href="htpps://newrelic.com/">New Relic</NavItem.Primary>
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
				<NavItem.Tab href="htpps://newrelic.com/">New Relic</NavItem.Tab>
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
					<NavItem.Toolbar href="htpps://newrelic.com/">New Relic</NavItem.Toolbar>
					<NavItem.Toolbar disabled href="https://google.com/">
						Not accessible
					</NavItem.Toolbar>
				</Nav.Toolbar>
			</Box>
		</>
	),
};
