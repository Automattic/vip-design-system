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
import { FormSelectArrow } from './FormSelectArrow';
import { Label } from '../Form/Label';
import { FormSelectSearch } from './FormSelectSearch';
import { FormSelectLoading } from './FormSelectLoading';
import { baseControlBorderStyle, inputBaseBackground, inputBaseText } from '../Form/Input.styles';
import { Validation } from '../Form';
import { Button } from '../Button';
import ScreenReaderText from '../ScreenReaderText';

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

const DefaultArrow = config => <FormSelectArrow classNames={ config.className } />;

const FormAutocompleteMultiselect = React.forwardRef(
	(
		{
			autoFilter = true,
			className,
			debounce = 0,
			displayMenu = 'overlay',
			dropdownArrow = DefaultArrow,
			errorMessage,
			forLabel = 'vip-autocompletemultiselect',
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
			...props
		},
		forwardRef
	) => {
		const [ isDirty, setIsDirty ] = useState( false );
		const [ selectedOptions, setSelectedOptions ] = useState( [] );
		let debounceTimeout;

		const SelectLabel = () => (
			<Label required={ required } htmlFor={ forLabel }>
				{ label }
			</Label>
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
				selectedOptions.map( option => option?.label || option )
			);
		}, [ selectedOptions ] );

		const onValueChange = useCallback(
			inputValue => {
				if ( inputValue && ! selectedOptions.includes( inputValue ) ) {
					setSelectedOptions( [ ...selectedOptions, inputValue ] );
				}
			},
			[ getOptionByLabel, setSelectedOptions, selectedOptions ]
		);

		const unselectValue = useCallback(
			inputValue => {
				if ( inputValue ) {
					setSelectedOptions(
						selectedOptions.filter( option => ( option?.label || option ) !== inputValue )
					);
				}
			},
			[ getOptionByLabel, setSelectedOptions, selectedOptions ]
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

		const suggest = useCallback(
			( query, populateResults ) => {
				let data = options;
				if ( isDirty && onInputChange ) {
					handleInputChange( query );
				}
				if ( isDirty && autoFilter ) {
					data = handleTypeChange( query );
				}
				populateResults( data?.map( option => optionLabel( option ) ) );
			},
			[ autoFilter, isDirty, onInputChange, options ]
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

		useEffect( () => {
			global.document.querySelector( `#${ forLabel }` ).addEventListener( 'keydown', () => {
				setIsDirty( true );
			} );
		}, [ setIsDirty ] );

		// For accessibility, we need to add the error message to the aria-describedby attribute
		useEffect( () => {
			const input = global.document.querySelector( `#${ forLabel }` );
			input?.setAttribute(
				'aria-describedby',
				`describe-${ forLabel }-validation ${ input.getAttribute( 'aria-describedby' ) }`
			);
		}, [] );

		const autocomplete = (
			<Autocomplete
				id={ forLabel }
				aria-busy={ loading }
				showAllValues={ showAllValues }
				ref={ forwardRef }
				source={ source || suggest }
				defaultValue={ value }
				displayMenu={ displayMenu }
				onConfirm={ onValueChange }
				tNoResults={ noOptionsMessage }
				required={ required }
				dropdownArrow={ showAllValues ? dropdownArrow : () => '' }
				confirmOnBlur={ false }
				{ ...props }
			/>
		);

		return (
			<div className={ classNames( 'vip-form-autocomplete-component', className ) }>
				{ label && ! isInline && <SelectLabel /> }

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

						{ autocomplete }

						{ loading && <FormSelectLoading sx={ { right: showAllValues ? 40 : 10 } } /> }
					</FormSelectContent>
				</div>
				<div sx={ { height: 120, overflow: 'auto', mt: 3 } }>
					<ul sx={ { listStyleType: 'none', padding: 0 } }>
						{ selectedOptions &&
							selectedOptions.map( option => (
								<li key={ option } sx={ { mt: 1 } }>
									{ option }
									<Button
										variant="text"
										sx={ {
											ml: 2,
											width: 100,
											height: 20,
											fontSize: 1,
										} }
										onClick={ () => {
											unselectValue( option );
										} }
									>
										<ScreenReaderText>
											{ option }, selected. Press Enter or Space to remove selection
										</ScreenReaderText>
										<div aria-hidden="true">Remove</div>
									</Button>
								</li>
							) ) }
					</ul>
				</div>
				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</div>
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
