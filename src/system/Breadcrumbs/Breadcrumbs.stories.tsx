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

The Breacrumbs component is used to show the current location of the user in the application. It is usually placed in a prominent position at the top of a site, or anywhere that needs a linked-navigation.

## Guidance

### When to use the Breadcrumbs component

- TBD

### When to consider something else

- TBD

## Accessibility Considerations guidance

- TBD

### Usability guidance

- TBD

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
