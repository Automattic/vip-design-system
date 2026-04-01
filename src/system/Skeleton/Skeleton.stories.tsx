/**
 * Internal dependencies
 */
import { Skeleton } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Skeleton',
	component: Skeleton,
};

type Story = StoryObj< typeof Skeleton >;

export const Default: Story = {
	args: {},
};

export const Grouped: Story = {
	args: {
		times: 3,
	},
};

export const Circle: Story = {
	args: {
		variant: 'circle',
		width: '50px',
		height: '50px',
	},
};

export const Text: Story = {
	args: {
		variant: 'text',
	},
};
