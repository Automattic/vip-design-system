import React from 'react';
import { ThemeUIProvider } from 'theme-ui';

import { theme } from '../../src/system';

export const Bug = () => {
	return <ThemeUIProvider theme={ theme }>Empty</ThemeUIProvider>;
};
