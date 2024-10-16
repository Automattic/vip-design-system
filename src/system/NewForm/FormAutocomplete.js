/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import Autocomplete from 'accessible-autocomplete/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Internal dependencies
 */
import './FormAutocomplete.css';
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';
import { FormSelectLoading } from './FormSelectLoading';
import { FormSelectSearch } from './FormSelectSearch';
import { Validation } from '../Form';
import { baseControlBorderStyle, inputBaseText } from '../Form/Input.styles';
import { Label } from '../Form/Label';

const baseBorderTextColors = {
	...baseControlBorderStyle,
	backgroundColor: 'layer.2',
	color: inputBaseText,
	borderRadius: 1,
};

const defaultStyles = {
	width: '100%',
	mb: 2,
	...baseBorderTextColors,

	py: 0,
	minHeight: '36px',
	lineHeight: '36px',
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
		'&:focus-visible': { outlineWidth: 0, boxShadow: 'none' },
		'&:focus-within': { outlineWidth: 0, boxShadow: 'none' },
		'&.autocomplete__input--focused': { outlineWidth: 0, boxShadow: 'none' },
		'&.autocomplete__input--show-all-values': { paddingRight: 7 },
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
		bg: 'layer.1',
	},
	'& .autocomplete__option:hover, & .autocomplete__option--focused': {
		bg: 'input.background.primary',
		borderColor: 'input.background.primary',
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
	'& .autocomplete__input.autocomplete__input': {
		paddingLeft: 6,
	},
};

const DefaultArrow = config => <FormSelectArrow className={ config.className } />;

const FormAutocomplete = React.forwardRef(
	(
		{
			autoFilter = true,
			className,
			debounce = 0,
			displayMenu = 'overlay',
			dropdownArrow = DefaultArrow,
			forLabel = 'vip-autocomplete',
			getOptionLabel,
			getOptionValue,
			errorMessage,
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
			resetOnBlur = false, // resets the input value to the selection if the input is blurred. Returns null if selection is empty
			source,
			value,
			...props
		},
		forwardRef
	) => {
		const [ isDirty, setIsDirty ] = useState( false );
		const [ sourceDebounceTimeout, setSourceDebounceTimeout ] = useState( null );
		const [ selectedValue, setSelectedValue ] = useState( value || '' );
		const [ inputQuery, setInputQuery ] = useState( value );
		let debounceTimeout;
		if ( ! forwardRef ) {
			forwardRef = React.createRef();
		}

		const SelectLabel = () => (
			<Label required={ required } htmlFor={ forLabel }>
				{ label }
			</Label>
		);

		const inlineLabel = Boolean( isInline && label );

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
		/**
		 * Reset the underlying component state to show the selected value
		 */
		const resetInputState = useCallback( () => {
			if ( resetOnBlur && forwardRef?.current && inputQuery !== selectedValue ) {
				// resets the input field to the selected value or the empty string
				forwardRef.current.setState( {
					...forwardRef.current.state,
					query: inputQuery && inputQuery !== '' ? selectedValue ?? '' : '', // selected value should not be null or the component will crash
				} );
			}
		}, [ forwardRef ] );
		// sets the internal state variables and calls the onChange callback
		const setAutocompleteState = inputValue => {
			setInputQuery( inputValue );
			setSelectedValue( inputValue );
			onChange( getOptionByLabel( inputValue ), inputValue );
			setIsDirty( false );
		};
		// this method gets called when we confirm the selection via click/enter
		const onValueChange = useCallback(
			inputValue => {
				if ( inputValue ) {
					setAutocompleteState( inputValue );
				} else if ( resetOnBlur && inputQuery !== selectedValue ) {
					if ( inputQuery && inputQuery !== '' ) {
						// reset the content to the selected value
						setAutocompleteState( selectedValue );
					} else {
						// reset the content to empty if there's no match
						setAutocompleteState( null );
					}
				}
			},
			[ onChange, getOptionByLabel, setAutocompleteState ]
		);

		const handleTypeChange = useCallback(
			query => {
				return options.filter(
					option => optionLabel( option ).toLowerCase().indexOf( query.toLowerCase() ) >= 0
				);
			},
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
		// internal function to save the inputQuery
		const handleSource = ( query, populateResults ) => {
			setInputQuery( query );
			// user function to fetch the results has the precedence
			if ( source ) {
				if ( ! debounce ) {
					source( query, populateResults );
					return;
				}
				if ( sourceDebounceTimeout ) {
					clearTimeout( sourceDebounceTimeout );
					setSourceDebounceTimeout( null );
				}

				if ( ! query.length || query.length >= minLength ) {
					setSourceDebounceTimeout(
						setTimeout( () => {
							source( query, populateResults );
							setSourceDebounceTimeout( null );
						}, debounce )
					);
				}
			} else {
				suggest( query, populateResults );
			}
		};
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
			global.document.querySelector( `#${ forLabel }` ).addEventListener( 'keydown', e => {
				// pressed escape, we want to reset the status
				if ( e.keyCode === 27 && resetOnBlur ) {
					resetInputState();
				} else {
					setIsDirty( true );
				}
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

		useEffect( () => {
			global.document.querySelector( `#${ forLabel }` ).addEventListener( 'blur', () => {
				setInputQuery( global.document.querySelector( `#${ forLabel }` ).value );
				resetInputState();
			} );
		}, [ forwardRef ] );
		return (
			<div className={ classNames( 'vip-form-autocomplete-component', className ) }>
				{ label && ! isInline && <SelectLabel /> }

				<div
					sx={ {
						...defaultStyles,
						...( isInline && inlineStyles ),
						...( searchIcon && searchIconStyles ),
						...( hasError ? { borderColor: 'input.border.error' } : {} ),
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
							showAllValues={ showAllValues }
							ref={ forwardRef }
							source={ handleSource }
							defaultValue={ value }
							displayMenu={ displayMenu }
							onConfirm={ onValueChange }
							tNoResults={ noOptionsMessage }
							required={ required }
							dropdownArrow={ showAllValues ? dropdownArrow : () => '' }
							{ ...props }
						/>

						{ loading && <FormSelectLoading sx={ { right: showAllValues ? 7 : 3 } } /> }
					</FormSelectContent>
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

FormAutocomplete.propTypes = {
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
	label: PropTypes.node,
	loading: PropTypes.bool,
	minLength: PropTypes.number,
	noOptionsMessage: PropTypes.func,
	onChange: PropTypes.func,
	onInputChange: PropTypes.func,
	options: PropTypes.array,
	required: PropTypes.bool,
	searchIcon: PropTypes.bool,
	showAllValues: PropTypes.bool,
	resetOnBlur: PropTypes.bool,
	source: PropTypes.func,
	value: PropTypes.string,
	dropdownArrow: PropTypes.node,
};

FormAutocomplete.displayName = 'FormAutocomplete';

export { FormAutocomplete };
