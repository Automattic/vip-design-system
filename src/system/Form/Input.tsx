/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Input as ThemeInput, InputProps as ThemeInputProps } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlStyle } from './Input.styles';
import { Validation, Label, Box } from '../';

const inputStyles = {
	unset: 'all',
	...baseControlStyle,
	lineHeight: 'inherit',
	minHeight: '36px',
	px: 3,
	py: 2,
	mb: 0,
	fontSize: 2,
	variant: 'inputs.default',
};

interface InputProps extends ThemeInputProps {
	label?: string;
	hasError?: boolean;
	required?: boolean;
	forLabel?: string;
	errorMessage?: string;
}
export const Input = React.forwardRef< HTMLInputElement, InputProps >(
	( { label, forLabel, hasError = false, required, sx = {}, errorMessage, ...props }, ref ) => (
		<React.Fragment>
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
						...inputStyles,
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
		</React.Fragment>
	)
);

Input.displayName = 'Input';
