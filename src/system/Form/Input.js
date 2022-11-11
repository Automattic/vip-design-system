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

const RequiredLabel = () => (
	<span sx={ { color: 'error', display: 'inline-block', ml: 2, fontSize: 1 } }>(Required)</span>
);

const inputStyles = {
	unset: 'all',
	border: '1px solid',
	borderColor: 'border',
	backgroundColor: 'card',
	borderRadius: 1,
	lineHeight: 'inherit',
	px: 3,
	py: 2,
	fontSize: 2,
	mb: 2,
	color: 'text',
	display: 'block',
	width: '100%',
	'&:focus': theme => theme.outline,
	'&:focus-visible': theme => theme.outline,
	'&:disabled': {
		bg: 'backgroundSecondary',
	},
	'&::placeholder': {
		color: 'placeholder',
	},
};

const Input = React.forwardRef(
	( { variant, label, forLabel, hasError, required, sx = {}, errorMessage, ...props }, ref ) => (
		<React.Fragment>
			{ label && (
				<Label htmlFor={ forLabel }>
					{ label }
					{ required && <RequiredLabel /> }
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

export { Input };
