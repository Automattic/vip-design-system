/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { ElementType } from 'react';
import { Box, ThemeUIStyleObject, LabelProps as ThemeLabelProps } from 'theme-ui';
/**
 * Internal dependencies
 */
import { RequiredLabel } from './RequiredLabel';

export const baseLabelColor = 'input.label.default';
export const baseLabelStyle = {
	fontWeight: 500,
	fontSize: 2,
	lineHeight: 1.5,
	color: baseLabelColor,
};
interface LabelProps extends ThemeLabelProps {
	children?: React.ReactNode;
	required?: boolean;
	sx?: ThemeUIStyleObject;
	as?: ElementType;
}

export const Label = React.forwardRef< HTMLLabelElement, LabelProps >(
	( { sx, children, required, as = 'label', ...rest }, forwardRef ) => (
		<Box
			as={ as }
			sx={ {
				all: 'unset',
				...baseLabelStyle,
				display: 'block',
				mb: 2,
				...sx,
			} }
			ref={ forwardRef }
			{ ...rest }
		>
			{ children }
			{ required && <RequiredLabel /> }
		</Box>
	)
);

Label.displayName = 'Label';
