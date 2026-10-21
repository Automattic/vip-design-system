import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|tsx)', '../docs/**/*.mdx'],
	addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-a11y'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		defaultName: 'Docs',
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
	viteFinal: async (config, { configType }) => {
		if (configType !== 'PRODUCTION') return config;
		const { mergeConfig } = await import('vite');
		return mergeConfig(config, {
			build: {
				rolldownOptions: {
					output: {
						codeSplitting: {
							// With Vite 8.0.13 / Rolldown 1.0.1, merging MDX into the preview
							// entry loses MDXProvider's export for Storybook's dynamic import.
							// Keep its namespace in a separate chunk so static docs can render.
							groups: [{ name: 'mdx-react', test: /node_modules[/\\]@mdx-js[/\\]react[/\\]/ }],
						},
					},
				},
			},
		});
	},
};

export default config;
