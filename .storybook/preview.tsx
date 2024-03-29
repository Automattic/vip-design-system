import React from 'react';
import withBoundingBox from './decorators/withBoundingBox';
import withColorMode, { backgrounds } from './decorators/withColorMode';
import withThemeProvider from './decorators/withThemeProvider';

import { Title, Subtitle, Description, Controls, Stories } from '@storybook/blocks';

export const decorators = [ withBoundingBox, withColorMode, withThemeProvider ];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: { expanded: true },
	backgrounds,
	docs: {
		page: () => (
			<>
				<Title />
				<Subtitle />
				<Description />
				<Controls />
				<Stories />
			</>
		),
		canvas: {
			sourceState: 'shown',
		},
	},
	options: {
		storySort: {
			method: 'alphabetical',
			order: [ '*', 'Deprecated' ],
		},
	},
};
