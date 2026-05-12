/**
 * Internal dependencies
 */
import { Spinner } from '..';

import type { StoryObj } from '@storybook/react-vite';

export default {
	title: 'Spinner',
	component: Spinner,
};

type Story = StoryObj< typeof Spinner >;

export const Default: Story = {
	args: {},
};
