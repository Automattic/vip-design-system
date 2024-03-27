/**
 * External dependencies
 */
import { Avatar } from '..';

import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */

export default {
	title: 'Avatar',
	component: Avatar,
};

type Story = StoryObj< typeof Avatar >;

const COMMON_SIZES = [ 128, 64, 48, 32, 24, 16 ];

export const Default = () => (
	<>
		{ COMMON_SIZES.map( size => (
			<Avatar key={ size } size={ size } src="https://i.pravatar.cc/100" />
		) ) }
	</>
);
export const WithName: Story = {
	args: {
		name: 'Kitty',
		size: 30,
	},
};
