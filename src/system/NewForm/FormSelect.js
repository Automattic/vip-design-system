/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Form/Label';

/**
 * Internal dependencies
 */
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';

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

		const SelectLabel = () => <Label htmlFor={ forLabel || props.id }>{ label }</Label>;
		const inlineLabel = !! ( isInline && label );

		return (
			<>
				{ label && ! isInline && <SelectLabel /> }

				<FormSelectContent isInline={ inlineLabel } label={ inlineLabel ? <SelectLabel /> : null }>
					<select
						ref={ forwardRef }
						sx={ {
							width: '100%',
							paddingLeft: 3,
							paddingRight: 40, // 40px for the icon
							py: 0,
							borderColor: 'border',
							borderRadius: 1,
							appearance: 'none',
							minHeight: '36px',
							'&:focus': theme => theme.outline,
							'&:focus-visible': theme => theme.outline,
							'&:focus-within': theme => theme.outline,
						} }
						{ ...props }
					>
						{ placeholder && <option>{ placeholder }</option> }
						{ options.map( ( { label: optionLabel, value, options: groupOptions } ) =>
							value ? renderOption( optionLabel, value ) : renderGroup( optionLabel, groupOptions )
						) }
					</select>

					<FormSelectArrow />
				</FormSelectContent>
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
