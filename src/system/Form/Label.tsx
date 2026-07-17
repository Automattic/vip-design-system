/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Box, BoxProps } from 'theme-ui';

/**
 * Internal dependencies
 */
import { RequiredLabel } from './RequiredLabel';

export const baseLabelColor = 'input.label.default';
export const baseLabelStyle = {
	variant: 'forms.label',
	color: baseLabelColor,
};

export interface LabelProps extends BoxProps {
	/** The content rendered inside the label. */
	children?: React.ReactNode;
	/** Whether the label should display a pointer cursor on hover. */
	clickable?: boolean;
	/** Whether to display a required field indicator next to the label. */
	required?: boolean;
	/** The ID of the form element this label is associated with. */
	htmlFor?: string;
	/** Ref forwarded to the underlying label element. */
	ref?: React.Ref< HTMLLabelElement >;
}

/**
 * A form label component with support for required field indicators and clickable styling.
 */
export const Label = ( {
	sx,
	children,
	required,
	clickable,
	as = 'label',
	ref,
	...rest
}: LabelProps ) => (
	<Box
		as={ as }
		sx={ {
			margin: 0,
			padding: 0,
			border: 0,
			outline: 0,
			...baseLabelStyle,
			display: 'block',
			mb: 2,
			cursor: clickable ? 'pointer' : 'default',
			...sx,
		} }
		ref={ ref }
		{ ...rest }
	>
		{ children }
		{ required && <RequiredLabel /> }
	</Box>
);

Label.displayName = 'Label';
