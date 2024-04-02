require( '@automattic/eslint-plugin-wpvip/init' );

module.exports = {
	extends: [
		'plugin:@automattic/wpvip/recommended',
		'plugin:@automattic/wpvip/weak-javascript',
		'plugin:@automattic/wpvip/weak-testing',
		'plugin:storybook/recommended',
	],
	globals: {
		alert: true,
		window: true,
	},
	rules: {
		complexity: 'off',
		'id-length': 'off',
		'import/no-extraneous-dependencies': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'jsx-a11y/no-autofocus': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'no-prototype-builtins': 'off',
		'prettier/prettier': 'error',
		'react/no-unknown-property': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'security/detect-object-injection': 'off',
	},
};
