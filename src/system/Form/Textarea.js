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

const Textarea = React.forwardRef( ( { variant, label, forLabel, hasError, required, errorMessage, ...props }, ref ) => (
	<React.Fragment>
		{ label &&
			<Label for={ forLabel }>
				{ label }
				{ required &&
					'*'
				}
			</Label>
		}
		<textarea
			{ ...props }
			ref={ ref }
			sx={ {
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
				'&:focus': {
					borderColor: 'brand.60',
					outline: 'none',
				},
				'&:disabled': {
					backgroundColor: 'background',
				},
			} }
		/>
		{ hasError && errorMessage &&
			<Validation>{ errorMessage }</Validation>
		}
	</React.Fragment>
) );

Textarea.propTypes = {
	variant: PropTypes.string,
	label: PropTypes.string,
	hasError: PropTypes.bool,
	required: PropTypes.bool,
	forLabel: PropTypes.string,
	errorMessage: PropTypes.string,
};

export { Textarea };
