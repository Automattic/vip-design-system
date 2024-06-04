/** @jsxImportSource theme-ui */

import React from 'react';

import { Breadcrumbs as Breadcrumbs } from './Breadcrumbs';
import { Box } from '../Box';
import { CustomLinkComponentized } from '../utils/stories/CustomLink';

import type { StoryObj } from '@storybook/react';

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

## Using the component

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
		<Box sx={ { display: 'flex', flexDirection: 'column', gap: 4 } }>
			<p>
				When entering Mobile views, the first and the last link will appear. A button with a … will
				also be visible. Once pressed, the rest of the links become available, and the focus is
				moved to the next link.
			</p>

			<hr sx={ { width: '100%', my: 4 } } />

			<Breadcrumbs
				LinkComponent={ CustomLinkComponentized }
				label="Nav Breadcrumbs"
				links={ [
					{ href: '/', label: 'Home' },
					{ href: 'https://datadog.com/', label: 'Data dog' },
					{ href: 'https://newrelic.com/', label: 'Old Relic' },
					{ href: 'https://rollbar.com/', label: 'Roll' },
					{ href: 'https://areallylong.com/', label: 'Not so long ago' },
					{ href: 'https://goog12313le.com/', label: 'Ioleleirrul' },
					{ href: 'https://datad56og.com/', label: 'Data cat' },
					{ href: 'https://newre5lic.com/', label: 'New Relic' },
					{ href: 'https://roll5bar.com/', label: 'bar' },
					{ href: 'https://areal4lylong.com/', label: 'Another asda' },
					{ href: 'https://google.com/', label: 'I am the last item' },
					{ href: 'https://data4do3g.com/', label: 'Dog monkey' },
					{ href: 'https://newr2elic2.com/', label: 'New rock' },
					{ href: 'https://roll221bar.com/', label: 'MC Donalds' },
					{ href: 'https://area33llylong.com/', label: 'A really long name' },
					{ href: 'https://goo66gle.com/', label: 'OMG this works' },
				] }
			/>
		</Box>
	),
};
