module.exports = {
	ignore: [],
	plugins: [],
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				modules: false,
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
		'@babel/preset-typescript',
	],
};
