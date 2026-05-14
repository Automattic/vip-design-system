import type { Preview } from '@storybook/react';
import '../src/css/index.css';

const preview: Preview = {
	parameters: {
		controls: {
			expanded: true,
		},
		backgrounds: {
			disable: true,
		},
	},
};

export default preview;
