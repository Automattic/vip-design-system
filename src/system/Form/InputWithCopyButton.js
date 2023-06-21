/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdContentCopy } from 'react-icons/md';
import { Button } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Validation, Label } from '..';
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

const InputWithCopyButton = React.forwardRef(
	(
		{ variant, label, forLabel, hasError = false, required, sx = {}, errorMessage, ...props },
		ref
	) => {
		if ( ! ref ) {
			ref = React.createRef();
		}

		const handleCopy = e => {
			e.preventDefault();
			if ( ! ref.current ) {
				return;
			}
			const originalTypeStatus = ref.current.getAttribute( 'type' ) || '';
			if ( ref.current.getAttribute( 'value' ) === '' ) {
				ref.current.setAttribute( 'value', '    ' );
			}
			ref.current.setAttribute( 'type', 'text' );
			ref.current.select();
			document.execCommand( 'copy' ); // eslint-disable-line no-undef
			ref.current?.setAttribute( 'type', originalTypeStatus );
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
							...inputStyles,
							...sx,
							...( hasError ? { borderColor: 'input.border.error' } : {} ),
						} }
						{ ...props }
					/>
					<div sx={ { ml: 2 } }>
						<Button
							sx={ { height: '40px' } }
							aria-label={ `Copy ${ label }` }
							onClick={ handleCopy }
						>
							<MdContentCopy />
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
};

InputWithCopyButton.displayName = 'InputWithCopyButton';

export { InputWithCopyButton };
