import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: [ '../src/**/*.stories.[jt]sx' ],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-controls',
		'@storybook/addon-storysource',
	],
	docs: {
		autodocs: true,
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
};

export default config;
