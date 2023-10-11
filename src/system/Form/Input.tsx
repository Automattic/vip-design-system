/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Validation, Label } from '../';
import { Input as ThemeInput, InputProps as ThemeInputProps, ThemeUIStyleObject } from 'theme-ui';
import { baseControlStyle } from './Input.styles';

const inputStyles = {
	unset: 'all',
	...baseControlStyle,
	lineHeight: 'inherit',
	minHeight: '36px',
	px: 3,
	py: 2,
	fontSize: 2,
	mb: 2,
	variant: 'inputs.default',
};

interface InputProps extends ThemeInputProps {
	label?: string;
	hasError?: boolean;
	required?: boolean;
	forLabel?: string;
	errorMessage?: string;
	sx?: ThemeUIStyleObject;
}
export const Input = React.forwardRef< HTMLInputElement, InputProps >(
	( { label, forLabel, hasError = false, required, sx = {}, errorMessage, ...props }, ref ) => (
		<React.Fragment>
			{ label && (
				<Label required={ required } htmlFor={ forLabel }>
					{ label }
				</Label>
			) }
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
		</React.Fragment>
	)
);

Input.displayName = 'Input';
