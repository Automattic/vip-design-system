import withBoundingBox from './decorators/withBoundingBox';
import withColorMode, { backgrounds } from './decorators/withColorMode';
import withThemeProvider from './decorators/withThemeProvider';

export const decorators = [ withBoundingBox, withColorMode, withThemeProvider ];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: { expanded: true },
	backgrounds,
	options: {
		storySort: {
			method: 'alphabetical',
			order: [ '*', 'Deprecated' ],
		},
	},
};
