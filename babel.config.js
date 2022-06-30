module.exports = {
	ignore: [],
	plugins: [ '@babel/plugin-transform-runtime' ],
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
			},
		],
		[
			'@babel/preset-react',
			{
				importSource: 'theme-ui',
				runtime: 'automatic',
				throwIfNamespace: false,
			},
		],
	],
};
