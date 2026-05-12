/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Input as ThemeInput, InputProps as ThemeInputProps, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlStyle } from './Input.styles';
import { Validation, Label, Box } from '../';
import { ControlSize, controlSizeStyles } from '../types/controlSize';

const getInputStyles = ( size: ControlSize = 'large' ) => ( {
	unset: 'all',
	...baseControlStyle,
	...controlSizeStyles[ size ],
	mb: 0,
	variant: 'inputs.default',
} );

export interface InputProps extends Omit< ThemeInputProps, 'size' > {
	label?: string;
	hasError?: boolean;
	required?: boolean;
	forLabel?: string;
	errorMessage?: string;
	wrapperSx?: ThemeUIStyleObject;
	size?: ControlSize;
}
export const Input = React.forwardRef< HTMLInputElement, InputProps >(
	(
		{
			label,
			forLabel,
			hasError = false,
			required,
			sx = {},
			wrapperSx = {},
			errorMessage,
			size = 'large',
			...props
		},
		ref
	) => (
		<Box sx={ { ...wrapperSx } }>
			{ label && (
				<Label required={ required } htmlFor={ forLabel }>
					{ label }
				</Label>
			) }
			<Box sx={ { mb: 2 } }>
				<ThemeInput
					ref={ ref }
					id={ forLabel }
					required={ required }
					aria-required={ required }
					aria-describedby={ hasError ? `describe-${ forLabel }-validation` : undefined }
					sx={ {
						...getInputStyles( size ),
						...sx,
						...( hasError ? { borderColor: 'input.border.error' } : {} ),
					} }
					{ ...props }
				/>
				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</Box>
		</Box>
	)
);

Input.displayName = 'Input';
