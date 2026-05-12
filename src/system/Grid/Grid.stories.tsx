/**
 * External dependencies
 */
import { Grid } from '..';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

export default {
	title: 'Grid',
	component: Grid,
};

type Story = StoryObj< typeof Grid >;

export const Default: Story = {
	args: {
		children: 'Hello',
	},
};
