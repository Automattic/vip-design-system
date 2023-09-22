/**
 * External dependencies
 */
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Link } from '..';

export default {
	component: Link,
	title: 'Link',
};

type Story = StoryObj< typeof Link >;

export const Default: Story = {
	args: {
		children: 'Hello',
		href: '#!',
	},
};
