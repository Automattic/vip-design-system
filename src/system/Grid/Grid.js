/** @jsx jsx */
import { jsx, Grid as ThemeGrid } from 'theme-ui';

import React, { forwardRef } from 'react';

const Grid = forwardRef( ( props, ref ) => {
	return <ThemeGrid {...props} ref={ref} />;
} );

export { Grid };
