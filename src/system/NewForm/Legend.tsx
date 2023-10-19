/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { baseLabelStyle } from '../Form/Label';
import { ThemeUIStyleObject } from 'theme-ui';

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
