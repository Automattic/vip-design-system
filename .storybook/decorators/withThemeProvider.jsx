import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeProvider } from 'theme-ui';
import { Box, theme } from "../../src/system";

export default makeDecorator( {
	name: 'withThemeProvider',
	parameterName: 'themeUi',
	wrapper: ( storyFn, context ) => {
		return (
			<ThemeProvider theme={theme}>
				<Box sx={{ p: 4, height: "100vh" }}>
					{storyFn( context )}
				</Box>
			</ThemeProvider>
		);
	}
} );
