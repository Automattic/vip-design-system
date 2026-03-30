import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: [ '../src/**/*.stories.[jt]sx' ],

	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-links',
		'@storybook/addon-webpack5-compiler-babel',
	],

	docs: {},

	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};

export default config;
