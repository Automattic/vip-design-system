module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
	settings: {
		react: { version: 'detect' },
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	rules: {
		// To add @automattic/eslint-plugin-wpvip:
		//   1. npm install @automattic/eslint-plugin-wpvip
		//   2. Add 'plugin:@automattic/wpvip/recommended' to extends above
	},
	ignorePatterns: ['dist/', 'node_modules/', 'storybook-static/'],
};
