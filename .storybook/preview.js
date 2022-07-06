import React from 'react';
import ReactDOM from 'react-dom';
import axe from '@axe-core/react';
import withBoundingBox from './decorators/withBoundingBox';
import withColorMode, { backgrounds } from './decorators/withColorMode';
import withThemeProvider from './decorators/withThemeProvider';

axe( React, ReactDOM, 1000 );

export const decorators = [ withBoundingBox, withColorMode, withThemeProvider ];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: { expanded: true },
	backgrounds,
};
