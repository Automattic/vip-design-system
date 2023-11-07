/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Grid as ThemeGrid, GridProps as ThemeGridProps } from 'theme-ui';

export const Grid = forwardRef< HTMLDivElement, ThemeGridProps >(
	( props: ThemeGridProps, ref: Ref< HTMLDivElement > ) => <ThemeGrid { ...props } ref={ ref } />
);

Grid.displayName = 'Grid';
