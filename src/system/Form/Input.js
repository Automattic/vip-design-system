/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Validation, Label } from '../';
import { Input as ThemeInput } from 'theme-ui';
import { getColor, getVariants } from '../theme/getColor';

const borderVariant = getVariants( 'input.border' );

const baseControlBorderStyle = {
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: borderVariant.default,
};

const inputBaseText = getColor( 'text', 'secondary' );
const inputBaseBackground = getColor( 'input', 'background' );
const baseControlFocusStyle = {
	'&:focus': theme => theme.outline,
	'&:focus-visible': theme => theme.outline,
	'&:focus-within': theme => theme.outline,
};

const baseControlStyle = {
	...baseControlBorderStyle,
	backgroundColor: inputBaseBackground,
	color: inputBaseText,
	borderRadius: 1,
	display: 'block',
	width: '100%',

	...baseControlFocusStyle,
	'&:disabled': {
		borderColor: borderVariant.disabled,
	},

	'&::placeholder': {
		color: getColor( 'text', 'placeholder' ),
		opacity: 1,
	},
};

const inputStyles = {
	unset: 'all',
	...baseControlStyle,
	lineHeight: 'inherit',
	px: 3,
	py: 2,
	fontSize: 2,
	mb: 2,
};

const Input = React.forwardRef(
	( { variant, label, forLabel, hasError, required, sx = {}, errorMessage, ...props }, ref ) => (
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
				aria-describedby={ hasError ? `describe-${ forLabel }-validation` : undefined }
				sx={ { ...inputStyles, ...sx } }
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

Input.propTypes = {
	variant: PropTypes.string,
	label: PropTypes.string,
	hasError: PropTypes.bool,
	required: PropTypes.bool,
	forLabel: PropTypes.string,
	errorMessage: PropTypes.string,
	sx: PropTypes.object,
};

Input.displayName = 'Input';

export {
	Input,
	baseControlBorderStyle,
	inputBaseText,
	inputBaseBackground,
	baseControlStyle,
	baseControlFocusStyle,
};
