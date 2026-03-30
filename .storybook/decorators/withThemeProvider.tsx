import React from 'react';
import { ThemeUIProvider } from 'theme-ui';
import { theme } from '../../src/system';

const withThemeProvider = ( Story, context ) => {
	return (
		<ThemeUIProvider theme={ theme }>
			<Story { ...context } />
		</ThemeUIProvider>
	);
};

export default withThemeProvider;
