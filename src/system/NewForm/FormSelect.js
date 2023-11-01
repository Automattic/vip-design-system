/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Form/Label';

/**
 * Internal dependencies
 */
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';
import { baseControlStyle } from '../Form/Input.styles';
import { Validation } from '../Form';

const MAX_SUGGESTED_OPTIONS = 15;
const isDev = process.env.NODE_ENV !== 'production';

const defaultStyles = {
	...baseControlStyle,
	paddingLeft: 4,
	paddingRight: 7,
	py: 0,
	appearance: 'none',
	minHeight: '36px',
	lineHeight: '36px',
};

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
	(
		{
			isInline,
			placeholder,
			forLabel = 'vip-form-select',
			options,
			required,
			label,
			getOptionLabel,
			getOptionValue,
			onChange,
			hasError,
			errorMessage,
			...props
		},
		forwardRef
	) => {
		if ( isDev && options.length > MAX_SUGGESTED_OPTIONS ) {
			// eslint-disable-next-line no-console
			console.info(
				'For 16 or more items, consider using another component with a typeahead capability.'
			);
		}

		const getAllOptions = useMemo(
			() =>
				[
					...options.filter( option => ! option.options ),
					...options.filter( option => option.options ).map( option => option.options ),
				].reduce( ( a, b ) => a.concat( b ), [] ),
			[ options ]
		);

		const optionLabel = useCallback(
			option => ( getOptionLabel ? getOptionLabel( option ) : option.label ),
			[ getOptionLabel ]
		);

		const optionValue = useCallback(
			option => ( getOptionValue ? getOptionValue( option ) : option.value ),
			[ getOptionValue ]
		);

		const getOptionByValue = useCallback(
			value => getAllOptions.find( option => `${ optionValue( option ) }` === `${ value }` ),
			[ getAllOptions, optionValue ]
		);

		const onValueChange = useCallback(
			event =>
				onChange
					? onChange( getOptionByValue( event.target.value ), event )
					: getOptionByValue( event.target.value ),
			[ onChange, getOptionByValue ]
		);

		const SelectLabel = () => (
			<Label required={ required } htmlFor={ forLabel }>
				{ label }
			</Label>
		);

		const inlineLabel = !! ( isInline && label );

		return (
			<>
				{ label && ! isInline && <SelectLabel /> }

				<FormSelectContent isInline={ inlineLabel } label={ inlineLabel ? <SelectLabel /> : null }>
					<select
						onChange={ onValueChange }
						ref={ forwardRef }
						sx={ defaultStyles }
						required={ required }
						aria-required={ required }
						aria-describedby={ hasError ? `describe-${ forLabel }-validation` : undefined }
						id={ forLabel }
						{ ...props }
					>
						{ placeholder && <option>{ placeholder }</option> }
						{ options.map( ( { options: groupOptions, ...option } ) =>
							groupOptions
								? renderGroup( optionLabel( option ), groupOptions )
								: renderOption( optionLabel( option ), optionValue( option ) )
						) }
					</select>
					<FormSelectArrow />
				</FormSelectContent>

				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</>
		);
	}
);

FormSelect.propTypes = {
	errorMessage: PropTypes.string,
	forLabel: PropTypes.string,
	getOptionLabel: PropTypes.func,
	getOptionValue: PropTypes.func,
	hasError: PropTypes.bool,
	isInline: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
};

FormSelect.displayName = 'FormSelect';

export { FormSelect };
