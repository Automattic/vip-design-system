import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
	stories: [ '../src/**/*.stories.[jt]sx' ],

	addons: [ '@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-links' ],

	tags: {
		new: {},
		deprecated: {
			defaultFilterSelection: 'exclude',
		},
		experimental: {
			defaultFilterSelection: 'exclude',
		},
	},

	docs: {},

	framework: {
		name: '@storybook/react-vite',
		options: {},
	},

	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};

export default config;
