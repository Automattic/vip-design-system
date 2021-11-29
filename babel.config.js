module.exports = {
	ignore: [
		'**/*.stories.js',
	],
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
