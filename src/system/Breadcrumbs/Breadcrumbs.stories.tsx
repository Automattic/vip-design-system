import React from 'react';

import { BreadcrumbsBase as Breadcrumbs } from './Breadcrumbs';

import type { StoryObj } from '@storybook/react';

// eslint-disable-next-line jsx-a11y/anchor-has-content
const CustomLink = props => <a { ...props } />;

export default {
	title: 'Navigation/Breadcrumbs',
	component: Breadcrumbs,
	parameters: {
		docs: {
			description: {
				component: `

Breadcrumbs provide secondary navigation to help users understand where they are in a website. It is usually placed close to the H1 of a page. The last item of the breadrumb becomes a text.

## Guidance

### When to use the Breadcrumbs component

- *Provide orientation to users*. When you need to provide a secondary navigation to help users understand where they are in a website.
- *To facilitate navigation*. Breadcrumbs simplifies the understanding of complex navigation structures.

### When to consider something else

- If you need all navigation items to be clickable and are not explicitly trying to recreate the path to the current page, use the [Nav](/docs/navigation-nav--docs) component instead.
- Step-by-step processes. Use breadcrumbs for hierarchical relationships, not linear relationships (like individual steps in a multi-step process).

## Accessibility Considerations guidance

- This component uses the \`nav\` element. This allows assistive technology to present the breadcrumbs in context as a navigational element on the page.
- We use the proper AA contrast for separators.
- We use ordered lists and list items. The component uses \`ol\` for breadcrumbs and an \`li\` for each item. This allows assistive technology to enumerate the items in the breadcrumbs and allows shortcuts between list items.
- We have ARIA markup for additional context. We add \`aria-label="Breadcrumbs"\` on the main element and \`aria-current="page"\` on the current page.
- Hide separators from screen readers. The separators between links in the breadcrumbs should not be read by screen readers. We built with CSS-only.

### Using the component

- Use complete page titles. Use the same wording in breadcrumb text as in the page title.
- If possible, start with the word "Home”" Rather than using a house icon, spell out the word "Home" as the first link in the breadcrumbs.

### Usage with Next.js or other frameworks

~~~jsx filename="index.jsx"
import Link from 'next/link';

<Breadcrumbs
	LinkComponent={ Link } // We required you to pass the link component you want to use for the child links. This will apply the proper styles.
	label="Nav Breadcrumbs"
	links={ [] }
/>
~~~

-------

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Breadcrumbs >;

export const Default: Story = {
	render: () => (
		<Breadcrumbs
			LinkComponent={ CustomLink }
			label="Nav Breadcrumbs"
			links={ [
				{ href: 'https://wordpress.com', label: 'WordPress' },
				{ href: 'https://newrelic.com/', label: 'New Relic' },
				{ href: 'https://google.com/', label: 'Not accessible' },
			] }
		/>
	),
};
