/**
 * External dependencies
 */
import { Flex } from '..';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

export default {
	title: 'Flex',
	component: Flex,
};

type Story = StoryObj< typeof Flex >;

export const Default: Story = {
	args: {
		children: 'Hello',
	},
};
