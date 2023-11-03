/**
 * External dependencies
 */
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import * as Nav from '.';
import { NavItemProps } from './NavItem';

export default {
	title: 'Navigation/Nav',
	component: Nav.Root,
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

Pick one of the available variants:

- primary
- secondary
- display
- link
- tabs

### Usage with Next.js framwork

~~~jsx filename="index.jsx"
import Link from 'next/link';

<Nav.Root label="Etc">
	<Nav.Item
		active
		href="https://google.com"
		asChild // This is important to pass the link styles to the child
	>
		<Link href={ \`/orgs/\${ id }/sso/configurations/\${ idP }/edit/\${ tab.path }\` }>
			Your page name
		</Link>
	</Nav.Item>
</Nav.Root>
~~~

-------

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Nav >;

const variants = [
	'primary',
	'secondary',
	'display',
	'link',
	'tabs',
] as NavItemProps[ 'variant' ][];

export const Default: Story = {
	render: () => (
		<>
			{ variants.map( variant => (
				<>
					<p>
						<strong>Variant:</strong> { variant }
					</p>
					<Nav.Root
						key={ variant }
						variant={ variant }
						sx={ { mb: 4 } }
						label={ `Nav ${ variant }` }
					>
						<Nav.Item active href="#">
							PHP
						</Nav.Item>
						<Nav.Item href="https://wordpress.com">WordPress</Nav.Item>
						<Nav.Item href="htpps://newrelic.com/">New Relic</Nav.Item>
						<Nav.Item disabled href="https://google.com/">
							Not accessible
						</Nav.Item>
					</Nav.Root>
				</>
			) ) }
		</>
	),
};
