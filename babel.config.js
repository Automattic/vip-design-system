module.exports = {
	ignore: [],
	plugins: [],
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
