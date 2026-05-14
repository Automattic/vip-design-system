import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|tsx)', '../docs/**/*.mdx'],
	addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-a11y'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
		defaultName: 'Docs',
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};

export default config;
