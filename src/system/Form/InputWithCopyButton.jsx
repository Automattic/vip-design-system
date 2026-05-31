/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { Input as ThemeInput } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlStyle } from './Input.styles';
import { Button, Validation, Label } from '..';
import { controlSizeStyles } from '../types/controlSize';

const getInputStyles = ( size = 'large' ) => ( {
	unset: 'all',
	...baseControlStyle,
	...controlSizeStyles[ size ],
	mb: 2,
	variant: 'inputs.default',
} );

const InputWithCopyButton = React.forwardRef(
	(
		{
			variant,
			label,
			forLabel,
			hasError = false,
			required,
			sx = {},
			errorMessage,
			copyHandler,
			size = 'large',
			...props
		},
		ref
	) => {
		if ( ! ref ) {
			ref = React.createRef();
		}

		const handleCopy = e => {
			e.preventDefault();
			const clipboard = navigator.clipboard; // eslint-disable-line no-undef
			clipboard.writeText( ref.current.value );
			if ( copyHandler ) {
				copyHandler( ref.current.value );
			}
		};
		return (
			<React.Fragment>
				{ label && (
					<Label required={ required } htmlFor={ forLabel }>
						{ label }
					</Label>
				) }
				<div sx={ { display: 'flex' } }>
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
					<div sx={ { ml: 2 } }>
						<Button
							size={ size }
							aria-label={ `Copy ${ label }` }
							onClick={ handleCopy }
							variant="ghost"
						>
							<MdContentCopy sx={ { mr: 2 } } />
							Copy
						</Button>
					</div>
				</div>
				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</React.Fragment>
		);
	}
);

InputWithCopyButton.propTypes = {
	variant: PropTypes.string,
	label: PropTypes.string,
	hasError: PropTypes.bool,
	required: PropTypes.bool,
	forLabel: PropTypes.string,
	errorMessage: PropTypes.string,
	sx: PropTypes.object,
	copyHandler: PropTypes.func,
	size: PropTypes.oneOf( [ 'small', 'large' ] ),
};

InputWithCopyButton.displayName = 'InputWithCopyButton';

export { InputWithCopyButton };
