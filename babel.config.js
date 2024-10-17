module.exports = function ( api ) {
	const isTest = api.env( 'test' );
	return {
		ignore: [],
		plugins: [],
		presets: [
			[
				'@babel/preset-env',
				{
					loose: true,
					modules: isTest ? 'auto' : false,
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
};
