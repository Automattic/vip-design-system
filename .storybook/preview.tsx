import withBoundingBox from './decorators/withBoundingBox';
import withColorMode, { backgrounds } from './decorators/withColorMode';
import withThemeProvider from './decorators/withThemeProvider';

export const decorators = [ withBoundingBox, withColorMode, withThemeProvider ];

export const parameters = {
	controls: { expanded: true },
	backgrounds,
	docs: {
		canvas: {
			sourceState: 'shown',
		},

		codePanel: true,
	},
	options: {
		storySort: {
			method: 'alphabetical',
			order: [ '*', 'Deprecated' ],
		},
	},
};
export const tags = [ 'autodocs' ];
