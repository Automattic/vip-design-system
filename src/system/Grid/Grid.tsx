/**
 * External dependencies
 */
import { Ref } from 'react';
import { Grid as ThemeGrid, GridProps as ThemeGridProps } from 'theme-ui';

export const Grid = ( { ref, ...props }: ThemeGridProps & { ref?: Ref< HTMLDivElement > } ) => (
	<ThemeGrid { ...props } ref={ ref } />
);

Grid.displayName = 'Grid';
