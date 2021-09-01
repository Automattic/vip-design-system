/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Grid as ThemeGrid } from 'theme-ui';

import { forwardRef } from 'react';

const Grid = forwardRef( ( props, ref ) => {
	return <ThemeGrid {...props} ref={ref} />;
} );

Grid.displayName = 'Grid';

export { Grid };
