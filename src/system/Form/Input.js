/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Validation, Label } from '../';

const Input = React.forwardRef( ( { variant, label, forLabel, hasError, required, errorMessage, ...props }, ref ) => (
	<React.Fragment>
		{ label &&
			<Label htmlFor={ forLabel }>
				{ label }
				{ required &&
					'*'
				}
			</Label>
		}
		<input
			{ ...props }
			ref={ ref }
			id={ forLabel }
			required={ required }
			sx={ {
				border: '1px solid',
				borderColor: 'grey.60',
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
				'&:focus': {
					borderColor: 'brand.60',
					outline: 'none',
				},
				'&:disabled': {
					bg: 'backgroundSecondary',
				},
				'&::placeholder': {
					color: 'grey.30',
				},
			} }
		/>
		{ hasError && errorMessage &&
			<Validation>{ errorMessage }</Validation>
		}
	</React.Fragment>
) );

Input.propTypes = {
	variant: PropTypes.string,
	label: PropTypes.string,
	hasError: PropTypes.bool,
	required: PropTypes.bool,
	forLabel: PropTypes.string,
	errorMessage: PropTypes.string,
};

export { Input };
