module.exports = {
	stories: [ '../src/**/*.stories.jsx' ],
	webpackFinal: async (config, { configType }) => {
		config.plugins.push(
			require('unplugin-icons/webpack')({ compiler: 'jsx', jsx: 'react', iconCustomizer: (collection, icon, props) =>{
					// customize this @iconify icon in this collection
					if (props.size) {
						props.width = props.size
						props.height = props.size
					}
				}, }));
		// Make whatever fine-grained changes you need
		// Return the altered config
		return config;
	},
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-controls',
		'@storybook/addon-storysource',
	],
};
