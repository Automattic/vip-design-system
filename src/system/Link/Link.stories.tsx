/**
 * External dependencies
 */
import { Link } from '..';

import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */

export default {
	title: 'Navigation/Link',
	component: Link,
};

type Story = StoryObj< typeof Link >;

export const Default: Story = {
	args: {
		children: 'Hello',
		href: '#!',
	},
};
