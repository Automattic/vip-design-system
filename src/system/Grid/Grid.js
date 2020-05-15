/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Grid as ThemeGrid } from 'theme-ui';

import React, { forwardRef } from 'react';

const Grid = forwardRef( ( props, ref ) => {
	return <ThemeGrid {...props} ref={ref} />;
} );

Grid.displayName = 'Grid';

export { Grid };
