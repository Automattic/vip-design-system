import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { configDefaults } from 'vitest/config';

export default defineConfig({
	plugins: [
		react(),
		dts({
			include: ['src'],
			exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx', '**/*.stories.ts'],
		}),
	],
	build: {
		lib: {
			entry: resolve(import.meta.dirname, 'src/index.ts'),
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
			cssFileName: 'css/index',
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./test/setup.ts'],
		globals: true,
		/*
		 * Two gitignored directories hold code that is not part of this package
		 * but does contain files matching the default test glob:
		 *
		 *   build/   — stale compiled output from the v2 system
		 *   .claude/ — git worktrees the desktop app creates for other sessions,
		 *              each a full checkout at its own commit
		 *
		 * Vitest's defaults exclude dist/ but neither of these, so without this
		 * the runner collects ~70 foreign test files and the suite fails on
		 * imports that this tree does not have (theme-ui, classnames).
		 */
		exclude: [...configDefaults.exclude, 'build/**', '.claude/**'],
	},
});
