/**
 * External dependencies
 */
import type { StoryObj } from '@storybook/react';

/**
 * Internal dependencies
 */
import { Avatar } from '..';

export default {
	title: 'Avatar',
	component: Avatar,
};

type Avatar = StoryObj< typeof Avatar >;

export const Default: Avatar = {};
