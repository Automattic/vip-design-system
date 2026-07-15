/**
 * External dependencies
 */
import { Avatar } from '..';

import type { StoryObj } from '@storybook/react-vite';

/**
 * Internal dependencies
 */

export default {
	title: 'Avatar',
	component: Avatar,
};

type Story = StoryObj< typeof Avatar >;

const COMMON_SIZES = [ 128, 64, 48, 32, 24, 16 ];

export const Default: Story = {
	args: {
		src: 'https://i.pravatar.cc/100',
	},
	render: args => (
		<>
			{ COMMON_SIZES.map( size => (
				<Avatar { ...args } size={ size } key={ size } />
			) ) }
		</>
	),
};
export const WithName: Story = {
	args: {
		name: 'Kitty',
		size: 30,
		sx: {
			backgroundColor: '#D8A45F',
		},
	},
};
export const WithAbbreviation: Story = {
	args: {
		name: 'Taylor Swift',
		abbr: 'TS',
		size: 64,
		sx: {
			backgroundColor: '#D8A45F',
		},
	},
};
