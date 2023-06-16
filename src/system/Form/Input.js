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

const Input = React.forwardRef(
	(
		{
			variant,
			label,
			forLabel,
			hasError = false,
			required,
			sx = {},
			errorMessage,
			flexComponent = null,
			...props
		},
		ref
	) => (
		<React.Fragment>
			{ label && (
				<Label required={ required } htmlFor={ forLabel }>
					{ label }
				</Label>
			) }
			<div sx={ flexComponent && flexComponent.display === 'flex' ? { display: 'flex' } : {} }>
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
				{ flexComponent && <div sx={ { ml: 2 } }>{ flexComponent.component }</div> }
			</div>
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
