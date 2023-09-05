import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeUIProvider } from 'theme-ui';
import { Box, theme } from '../../src/system';

export default makeDecorator( {
	name: 'withThemeProvider',
	parameterName: 'themeUi',
	wrapper: ( storyFn, context ) => {
		return (
			<ThemeUIProvider theme={ theme }>
				<Box sx={ { height: '100vh' } }>{ storyFn( context ) }</Box>
			</ThemeUIProvider>
		);
	},
} );
