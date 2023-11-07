/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseLabelStyle } from '../Form/Label';

interface LegendProps {
	children?: React.ReactNode;
	sx?: ThemeUIStyleObject;
	className?: string;
}
export const Legend = React.forwardRef< HTMLLegendElement, LegendProps >(
	( { children, className, sx = {}, ...props }, forwardRef ) => (
		<legend
			ref={ forwardRef }
			className={ classNames( 'vip-form-legend-component', className ) }
			sx={ {
				all: 'unset',
				...baseLabelStyle,
				px: 1,
				mb: 0,
				...sx,
			} }
			{ ...props }
		>
			{ children }
		</legend>
	)
);

Legend.displayName = 'Legend';
