import type { Preview } from '@storybook/react';
import { DocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { useId, useState, useSyncExternalStore, type PropsWithChildren } from 'react';
import { themes } from 'storybook/theming';
import '../src/css/index.css';
import './preview.css';
import { htmlSource } from './helpers/html-source';

const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
const subscribe = (onChange: () => void) => {
	darkMode.addEventListener('change', onChange);
	return () => darkMode.removeEventListener('change', onChange);
};

// Docs has its own theme; keep it aligned with the CSS tokens' OS preference.
function SystemThemeDocsContainer(props: PropsWithChildren<DocsContainerProps>) {
	const isDark = useSyncExternalStore(subscribe, () => darkMode.matches);
	return <DocsContainer {...props} theme={isDark ? themes.dark : themes.light} />;
}

type ColorMode = 'system' | 'light' | 'dark';
const colorMode = (value: unknown): ColorMode =>
	value === 'light' || value === 'dark' ? value : 'system';

function StoryCanvas({
	children,
	initialMode,
	name,
}: PropsWithChildren<{ initialMode: ColorMode; name: string }>) {
	const [mode, setMode] = useState(initialMode);
	const selectId = useId();

	return (
		<div
			className="sb-theme-canvas"
			style={{ colorScheme: mode === 'system' ? 'light dark' : mode }}
		>
			<div className="sb-theme-toolbar">
				<label htmlFor={selectId}>Color mode</label>
				<span className="sb-theme-select">
					<select
						id={selectId}
						aria-label={`Color mode for ${name}`}
						value={mode}
						onChange={(event) => setMode(colorMode(event.target.value))}
					>
						<option value="system">System</option>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
					</select>
				</span>
			</div>
			<div className="sb-theme-content">{children}</div>
		</div>
	);
}

const preview: Preview = {
	decorators: [
		(Story, context) => (
			<StoryCanvas
				key={context.id}
				initialMode={colorMode(context.parameters.colorMode)}
				name={context.name}
			>
				<Story />
			</StoryCanvas>
		),
	],
	parameters: {
		options: {
			storySort: {
				method: 'alphabetical',
				order: ['Block Styles', 'Composition Styles', 'Utility Styles', 'React Components'],
			},
		},
		// The shared canvas supplies its own padding around the controls and story.
		layout: 'fullscreen',
		docs: {
			container: SystemThemeDocsContainer,
			source: { transform: htmlSource },
		},
		controls: {
			expanded: true,
		},
		backgrounds: {
			disable: true,
		},
	},
};

export default preview;
