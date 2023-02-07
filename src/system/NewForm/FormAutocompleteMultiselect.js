/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'accessible-autocomplete/react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { FormSelectContent } from './FormSelectContent';
import { Form } from '..';
import { FormSelectSearch } from './FormSelectSearch';
import { FormSelectLoading } from './FormSelectLoading';
import { baseControlBorderStyle, inputBaseBackground, inputBaseText } from '../Form/Input.styles';
import { Validation, Checkbox, Label } from '../Form';
import { Flex } from '../Flex';

const baseBorderTextColors = {
	...baseControlBorderStyle,
	backgroundColor: inputBaseBackground,
	color: inputBaseText,
	borderRadius: 1,
};

const defaultStyles = {
	width: '100%',
	...baseBorderTextColors,

	py: 0,
	minHeight: '36px',
	lineHeight: '36px',
	'&:focus': theme => theme.outline,
	'&:focus-visible': theme => theme.outline,
	'&:focus-within': theme => theme.outline,
	'&.autocomplete__input--focused': theme => theme.outline,
	'& .autocomplete__input': {
		width: '100%',
		paddingLeft: 3,
		py: 0,
		borderWidth: 0,
		color: 'text',
		minHeight: '36px',
		lineHeight: '36px',
		'&:focus': { outlineWidth: 0, boxShadow: 'none' },
		'&:focus-visible': { outlineWidth: 0, boxShadow: 'none' },
		'&:focus-within': { outlineWidth: 0, boxShadow: 'none' },
		'&.autocomplete__input--focused': { outlineWidth: 0, boxShadow: 'none' },
		'&.autocomplete__input--show-all-values': { paddingRight: '40px' },
	},
	'& .autocomplete__menu': {
		...baseBorderTextColors,
	},
	'& .autocomplete__hint, & .autocomplete__input, & .autocomplete__option': {
		fontSize: 'inherit',
	},
	'& .autocomplete__wrapper': {
		width: '100%',
	},
	'& .autocomplete__option': {
		borderColor: baseControlBorderStyle.borderColor,
	},
	'& .autocomplete__option--odd': {
		bg: 'backgroundSecondary',
	},
	'& .autocomplete__option:hover, & .autocomplete__option--focused': {
		bg: 'midnight',
		borderColor: 'midnight',
	},
	'& .autocomplete__input--show-all-values': {
		paddingRight: 0,
	},
	'& .autocomplete__hint': {
		border: 'none',
		paddingLeft: 3,
		minHeight: '27px',
		lineHeight: '27px',
	},
};

const inlineStyles = {
	borderWidth: 0,
};

const searchIconStyles = {
	'& .autocomplete__input.autocomplete__input--show-all-values': {
		paddingLeft: '30px',
	},
};

const FormAutocompleteMultiselect = React.forwardRef(
	(
		{
			autoFilter = true,
			className,
			debounce = 0,
			dropdownArrow = '',
			errorMessage,
			forLabel = 'vip-autocomplete-multiselect',
			getOptionLabel,
			getOptionValue,
			hasError,
			isInline,
			label,
			loading,
			minLength = 0,
			noOptionsMessage = () => 'No results found. Type to search.',
			onChange = () => {},
			onInputChange,
			options = [],
			required,
			searchIcon,
			showAllValues = false,
			source,
			value,
			isMulti,
			...props
		},
		forwardRef
	) => {
		const [ isDirty, setIsDirty ] = useState( false );
		const [ filteredOptions, setFilteredOptions ] = useState( options );
		const [ selectedOptions, setSelectedOptions ] = useState( [] );
		let debounceTimeout;

		const SelectLabel = () => (
			<Form.Label required={ required } htmlFor={ forLabel }>
				{ label }
			</Form.Label>
		);

		const inlineLabel = !! ( isInline && label );

		const optionLabel = useCallback(
			option => ( getOptionLabel ? getOptionLabel( option ) : option.label ),
			[ getOptionLabel ]
		);

		const getAllOptions = useMemo(
			() =>
				[
					...options.filter( option => ! option.options ),
					...options.filter( option => option.options ).map( option => option.options ),
				].reduce( ( a, b ) => a.concat( b ), [] ),
			[ options ]
		);

		const getOptionByLabel = useCallback(
			inputValue =>
				getAllOptions.find( option => `${ optionLabel( option ) }` === `${ inputValue }` ),
			[ getAllOptions, optionLabel ]
		);

		useEffect( () => {
			onChange(
				selectedOptions,
				selectedOptions.map( option => option.label )
			);
		}, [ selectedOptions ] );

		const onOptionSelect = useCallback(
			inputValue => {
				if ( inputValue ) {
					const selectedOption = getOptionByLabel( inputValue );
					const currentSelectedValues = [ ...selectedOptions, selectedOption ];
					setSelectedOptions( currentSelectedValues );
				}
			},
			[ onChange, getOptionByLabel, selectedOptions ]
		);
		const onOptionUnselect = useCallback(
			inputValue => {
				if ( inputValue ) {
					const selectedOption = getOptionByLabel( inputValue );
					const currentSelectedValues = selectedOptions.filter(
						option => option.value !== selectedOption.value
					);
					setSelectedOptions( currentSelectedValues );
				}
			},
			[ onChange, getOptionByLabel, selectedOptions ]
		);

		const handleTypeChange = useCallback(
			query =>
				options.filter(
					option => optionLabel( option ).toLowerCase().indexOf( query.toLowerCase() ) >= 0
				),
			[ options ]
		);

		const handleInputChange = useCallback(
			query => {
				if ( ! debounce ) {
					return onInputChange( query );
				}
				clearTimeout( debounceTimeout );
				if ( ! query.length || query.length >= minLength ) {
					debounceTimeout = setTimeout( () => {
						onInputChange( query );
					}, debounce );
				}
			},
			[ onInputChange, debounce, minLength ]
		);

		const filterResults = useCallback(
			query => {
				let data = options;

				if ( onInputChange ) {
					handleInputChange( query );
				}
				if ( autoFilter ) {
					data = handleTypeChange( query );
				}
				setFilteredOptions( data?.map( option => option ) );
			},
			[ autoFilter, onInputChange, options ]
		);

		useEffect( () => {
			global.document
				.querySelector( '.autocomplete__input' )
				.setAttribute( 'aria-activedescendant', '' );
		}, [] );

		useEffect( () => {
			global.document
				.querySelector( '.autocomplete__menu' )
				.setAttribute( 'aria-label', `${ label } list` );
		}, [ label ] );

		useEffect( () => {
			const input = global.document.querySelector( `#${ forLabel }` );

			if ( ! input || required === undefined ) {
				return;
			}

			input.setAttribute( 'aria-required', required );
		}, [ required ] );

		// For accessibility, we need to add the error message to the aria-describedby attribute
		useEffect( () => {
			const input = global.document.querySelector( `#${ forLabel }` );

			input?.setAttribute(
				'aria-describedby',
				`describe-${ forLabel }-validation ${ input.getAttribute( 'aria-describedby' ) }`
			);
		}, [] );

		return (
			<>
				<div className={ classNames( 'vip-form-autocomplete-component', className ) }>
					{ label && ! isInline && <SelectLabel /> }
					<Label sx={ { color: 'secondary', fontSize: 1 } }>
						{ selectedOptions.length } selected
					</Label>

					<div
						sx={ {
							...defaultStyles,
							...( isInline && inlineStyles ),
							...( searchIcon && searchIconStyles ),
						} }
					>
						<FormSelectContent
							isInline={ inlineLabel }
							label={ inlineLabel ? <SelectLabel /> : null }
						>
							{ searchIcon && <FormSelectSearch /> }

							<Autocomplete
								id={ forLabel }
								aria-busy={ loading }
								showAllValues={ false }
								ref={ forwardRef }
								source={ filterResults }
								required={ required }
								dropdownArrow={ '' }
								showNoOptionsFound={ false }
								{ ...props }
							/>

							{ loading && <FormSelectLoading sx={ { right: showAllValues ? 40 : 10 } } /> }
						</FormSelectContent>
					</div>
				</div>
				{ isMulti ? (
					<Form.Fieldset
						sx={ {
							overflow: 'auto',
							height: 100,
							mt: 2,
							border: 0,
							backgroundColor: 'inherit',
						} }
					>
						{ ' ' }
						<ul sx={ { listStyleType: 'none', padding: 0, mt: 0, mb: 0, ml: -2 } }>
							{ filteredOptions &&
								filteredOptions.map( option => (
									<li key={ option.value } sx={ { mt: 1 } }>
										<Flex>
											<Checkbox
												sx={ { mr: 2 } }
												id={ option.value }
												aria-labelledby={ `label-${ option.value }` }
												onCheckedChange={ e => {
													if ( e ) {
														onOptionSelect( option.label );
													} else {
														onOptionUnselect( option.label );
													}
												} }
												checked={
													selectedOptions.filter( op => op.label === option.label )?.length > 0
												}
											/>
											<Label htmlFor={ option.value } id={ `label-${ option.value }` }>
												{ option.label }
											</Label>
										</Flex>
									</li>
								) ) }
						</ul>
					</Form.Fieldset>
				) : null }
				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</>
		);
	}
);

FormAutocompleteMultiselect.propTypes = {
	autoFilter: PropTypes.bool,
	className: PropTypes.any,
	debounce: PropTypes.number,
	displayMenu: PropTypes.string,
	errorMessage: PropTypes.string,
	forLabel: PropTypes.string,
	getOptionLabel: PropTypes.func,
	getOptionValue: PropTypes.func,
	hasError: PropTypes.bool,
	isInline: PropTypes.bool,
	label: PropTypes.string,
	loading: PropTypes.bool,
	minLength: PropTypes.number,
	noOptionsMessage: PropTypes.func,
	onChange: PropTypes.func,
	onInputChange: PropTypes.func,
	options: PropTypes.array,
	required: PropTypes.bool,
	searchIcon: PropTypes.bool,
	showAllValues: PropTypes.bool,
	source: PropTypes.func,
	value: PropTypes.string,
	dropdownArrow: PropTypes.node,
};

FormAutocompleteMultiselect.displayName = 'FormAutocompleteMultiselect';

export { FormAutocompleteMultiselect };
