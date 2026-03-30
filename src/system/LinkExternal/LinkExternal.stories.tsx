import LinkExternal from './LinkExternal';

import type { StoryObj } from '@storybook/react-webpack5';

export default {
	title: 'Navigation/LinkExternal',
	component: LinkExternal,
};

type Story = StoryObj< typeof LinkExternal >;

export const Default: Story = {
	args: {
		children: 'View on GitHub',
		href: 'https://github.com/Automattic/vip-design-system',
	},
};
