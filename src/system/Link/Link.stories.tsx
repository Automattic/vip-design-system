/**
 * External dependencies
 */
import { Link, LinkVariant } from './Link';
import { Flex } from '../Flex/Flex';

import type { LinkProps } from './Link';
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */

export default {
	title: 'Navigation/Link',
	component: Link,
	argTypes: {
		variant: {
			type: 'select',
			options: Object.values( LinkVariant ),
		},
	},
	parameters: {
		docs: {
			description: {
				component: `

Links are navigational elements that direct visitors to other locations, either on the same page or to a different page or site. They can be inline or separate from the text flow. Since every link is a potential user interaction, too many links can be overwhelming.

## Guidance

### When to use the link component

- When you want to direct users to another page or site.
- When you want to direct users to another section of the same page (anchors).

### When to consider something else

- When you want to trigger an action (use a button instead).
- When you want to display a message (use a notification instead).

### Accessibility

- Don’t rely on only color to distinguish links
- Don’t block external links with disruptive notifications
- Icons can be helpful. Consider adding an icon to signal specific actions (Download, Open in a new window, etc).
- Don’t use the same link text for different URLs on the same page. This can confuse users and make it difficult for them to understand where the link will take them.

-------

This documentation is heavily inspired by the [U.S Web Design System (USWDS)](https://designsystem.digital.gov/components/link/). We use USWDS as trusted source of truth for accessibility and usability best practices.

## Component Properties
`,
			},
		},
	},
};

type Story = StoryObj< typeof Link >;

export const Default: Story = {
	args: {
		children: 'Hello',
		href: '#!',
	},
};

const buttonTypes: LinkProps[ 'variant' ][] = [
	'button-primary',
	'button-secondary',
	'button-tertiary',
	'button-danger',
	'button-display',
	'button-ghost',
];

export const ButtonVariants = () => (
	<Flex sx={ { gap: 2 } }>
		{ buttonTypes.map( ( variant, index ) => (
			<Link key={ index } href="#!" variant={ variant }>
				Hello
			</Link>
		) ) }
	</Flex>
);
