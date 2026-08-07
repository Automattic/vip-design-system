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

// A URL that is guaranteed to 404, to demonstrate the fallback chain.
const BROKEN_SRC = 'https://github.com/github-actions%5Bbot%5D.png?size=200';

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

/**
 * When the image fails to load, the avatar falls back to the initial from `name`
 * rather than leaving the browser's broken-image glyph on screen.
 */
export const BrokenImage: Story = {
	args: {
		name: 'Taylor Swift',
		src: BROKEN_SRC,
		sx: {
			backgroundColor: '#D8A45F',
		},
	},
	render: args => (
		<>
			{ COMMON_SIZES.map( size => (
				<Avatar { ...args } size={ size } key={ size } />
			) ) }
		</>
	),
};

/**
 * With no `name` or `abbr` to fall back to, a broken image degrades to a generic
 * user icon.
 */
export const IconFallback: Story = {
	args: {
		src: BROKEN_SRC,
		sx: {
			backgroundColor: '#D8A45F',
		},
	},
	render: args => (
		<>
			{ COMMON_SIZES.map( size => (
				<Avatar { ...args } size={ size } key={ size } />
			) ) }
		</>
	),
};

/**
 * Set `fallback="icon"` to always render the generic user icon, even when a `name`
 * or `abbr` is available. Useful for non-human actors such as bots and integrations,
 * where an initial would be misleading.
 */
export const ForcedIconFallback: Story = {
	args: {
		name: 'Platform Bot',
		fallback: 'icon',
		sx: {
			backgroundColor: '#D8A45F',
		},
	},
	render: args => (
		<>
			{ COMMON_SIZES.map( size => (
				<Avatar { ...args } size={ size } key={ size } />
			) ) }
		</>
	),
};

/**
 * The same icon fallback is used when no `src` is provided at all.
 */
export const NoImageOrName: Story = {
	args: {
		sx: {
			backgroundColor: '#D8A45F',
		},
	},
	render: args => (
		<>
			{ COMMON_SIZES.map( size => (
				<Avatar { ...args } size={ size } key={ size } />
			) ) }
		</>
	),
};
