import eslintReact from '@eslint-react/eslint-plugin';
import eslintJs from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/*
 * ESLint 10 flat config. Replaces .eslintrc.cjs (ESLint 8).
 *
 * React rules come from @eslint-react/eslint-plugin, which replaced
 * eslint-plugin-react (no ESLint 10 support). Its preset also carries the
 * Rules of Hooks and exhaustive-deps, so eslint-plugin-react-hooks is not
 * installed: using both reports the same problem twice.
 *
 * To add @automattic/eslint-plugin-wpvip later, install it and add its
 * flat config to `extends` below.
 */
export default defineConfig([
	globalIgnores(['dist/', 'storybook-static/']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			eslintJs.configs.recommended,
			tseslint.configs.recommended,
			eslintReact.configs['recommended-typescript'],
		],
		languageOptions: {
			parser: tseslint.parser,
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
]);
