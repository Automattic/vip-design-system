/**
 * External dependencies
 */
import { Grid as ThemeGrid, GridProps as ThemeGridProps } from 'theme-ui';
import { forwardRef, Ref } from 'react';

export const Grid = forwardRef< HTMLDivElement, ThemeGridProps >(
	( props: ThemeGridProps, ref: Ref< HTMLDivElement > ) => <ThemeGrid { ...props } ref={ ref } />
);

Grid.displayName = 'Grid';
