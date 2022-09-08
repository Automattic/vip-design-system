/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdExpandMore } from 'react-icons/md';
import { Label } from '../Form/Label';

/**
 * Internal dependencies
 */

const MAX_SUGGESTED_OPTIONS = 15;
const isDev = process.env.NODE_ENV !== 'production';

const renderOption = ( label, value ) => {
	return (
		<option key={ value } value={ value }>
			{ label }
		</option>
	);
};

const renderGroup = ( groupLabel, groupOptions ) => {
	return (
		<optgroup key={ groupLabel } label={ groupLabel }>
			{ groupOptions.map( ( { label, value } ) => renderOption( label, value ) ) }
		</optgroup>
	);
};

const FormSelect = React.forwardRef(
	( { isInline, placeholder, forLabel, options, label, ...props }, forwardRef ) => {
		if ( isDev && options.length > MAX_SUGGESTED_OPTIONS ) {
			// eslint-disable-next-line no-console
			console.info(
				'For 16 or more items, consider using another component with a typeahead capability.'
			);
		}

		return (
			<>
				{ label && <Label htmlFor={ forLabel || props.id }>{ label }</Label> }
				<div
					sx={ {
						'&:hover select': { borderColor: 'border' },
						display: 'inline-flex',
						flexDirection: 'row',
						alignItems: 'center',
					} }
					className="vip-select-component"
				>
					<select
						ref={ forwardRef }
						sx={ {
							borderRadius: '4px',
							padding: '10px 35px 10px 10px',
							borderColor: 'border',
							appearance: 'none',
							'&:focus': theme => theme.outline,
							'&:focus-visible': theme => theme.outline,
							'&:focus-within': theme => theme.outline,
							'&:hover': {
								borderColor: 'border',
							},
						} }
						{ ...props }
					>
						{ placeholder && <option>{ placeholder }</option> }
						{ options.map( ( { label: optionLabel, value, options: groupOptions } ) =>
							value ? renderOption( optionLabel, value ) : renderGroup( optionLabel, groupOptions )
						) }
					</select>

					<MdExpandMore
						aria-hidden="true"
						size={ 20 }
						sx={ {
							pl: 2,
							borderLeftWidth: '1px',
							borderLeftStyle: 'solid',
							borderLeftColor: 'border',
							position: 'relative',
							right: '2rem',
							pointerEvents: 'none',
						} }
					/>
				</div>
			</>
		);
	}
);

FormSelect.propTypes = {
	id: PropTypes.string,
	isInline: PropTypes.bool,
	forLabel: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
};

FormSelect.displayName = 'FormSelect';

export { FormSelect };
