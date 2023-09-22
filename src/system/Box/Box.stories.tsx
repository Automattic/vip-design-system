/**
 * External dependencies
 */
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Box } from '..';

export default {
	title: 'Box',
	component: Box,
};

type Story = StoryObj< typeof Box >;

export const Default: Story = {
	args: {
		children: 'Hello',
		sx: undefined,
	},
};
