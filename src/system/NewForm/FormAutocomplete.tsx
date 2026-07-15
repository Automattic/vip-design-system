/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import Autocomplete from 'accessible-autocomplete/react';
import classNames, { Argument } from 'classnames';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import './FormAutocomplete.css';
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';
import { FormSelectLoading } from './FormSelectLoading';
import { FormSelectSearch } from './FormSelectSearch';
import { baseControlBorderStyle, inputBaseText } from '../Form/Input.styles';
import { Label } from '../Form/Label';
import { Validation } from '../Form/Validation';

interface ThemeProps extends Theme {
	outline?: Record< string, string >;
}

export interface AutocompleteOption {
	label?: string;
	value?: string;
	options?: AutocompleteOption[];
	[ key: string ]: unknown;
}

// `accessible-autocomplete/react` ships no types; we hold a ref to its class instance to call its imperative API.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AutocompleteInstance = any;

export interface FormAutocompleteProps {
	/**
	 * Whether to filter the options client-side as the user types.
	 * @default true
	 */
	autoFilter?: boolean;
	/** Additional CSS class name(s) applied to the wrapper. */
	className?: Argument;
	/**
	 * Debounce (ms) applied to input/source callbacks.
	 * @default 0
	 */
	debounce?: number;
	/**
	 * How the options menu is displayed.
	 * @default 'overlay'
	 */
	displayMenu?: 'inline' | 'overlay';
	/** Render function for the dropdown arrow. */
	dropdownArrow?: ( config: { className?: string } ) => ReactNode;
	/**
	 * `id`/`htmlFor` value for the input and label.
	 * @default 'vip-autocomplete'
	 */
	forLabel?: string;
	/** Returns the display label for an option. */
	getOptionLabel?: ( option: AutocompleteOption ) => string;
	/** Returns the value for an option. */
	getOptionValue?: ( option: AutocompleteOption ) => string;
	/** Validation message shown when `hasError` is true. */
	errorMessage?: ReactNode;
	/** Whether the field is in an error state. */
	hasError?: boolean;
	/** Whether to render the label inline with the input. */
	isInline?: boolean;
	/** The field label. */
	label?: ReactNode;
	/** Whether the field is in a loading state. */
	loading?: boolean;
	/**
	 * Minimum query length before the source callback fires.
	 * @default 0
	 */
	minLength?: number;
	/** Returns the message shown when there are no results. */
	noOptionsMessage?: () => string;
	/** Called when a value is confirmed; receives the matched option and the input value. */
	onChange?: ( option: AutocompleteOption | undefined, inputValue: string | null ) => void;
	/** Called when the input value changes. */
	onInputChange?: ( query: string ) => void;
	/** The list of options. */
	options?: AutocompleteOption[];
	/** Whether a selection is required. */
	required?: boolean;
	/** Whether to render a leading search icon. */
	searchIcon?: boolean;
	/**
	 * Whether to show all values (dropdown-style) and render the arrow.
	 * @default false
	 */
	showAllValues?: boolean;
	/**
	 * Resets the input to the selection on blur; returns null if the selection is empty.
	 * @default false
	 */
	resetOnBlur?: boolean;
	/** Custom source function for fetching results. */
	source?: ( query: string, populateResults: ( results: string[] ) => void ) => void;
	/** The current value. */
	value?: string;
	/**
	 * Whether to allow arbitrary (custom) values not in the options.
	 * @default false
	 */
	allowCustom?: boolean;
	/** Placeholder text forwarded to the underlying autocomplete input. */
	placeholder?: string;
}

const baseBorderTextColors: ThemeUIStyleObject = {
	...baseControlBorderStyle,
	backgroundColor: 'layer.2',
	color: inputBaseText,
	borderRadius: 1,
};

const defaultStyles: ThemeUIStyleObject = {
	width: '100%',
	mb: 2,
	...baseBorderTextColors,

	py: 0,
	minHeight: '36px',
	lineHeight: '36px',
	'&:focus-visible': ( theme: ThemeProps ) => theme.outline,
	'&:focus-within': ( theme: ThemeProps ) => theme.outline,
	'&.autocomplete__input--focused': ( theme: ThemeProps ) => theme.outline,
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

const inlineStyles: ThemeUIStyleObject = {
	borderWidth: 0,
};

const allowCustomStyles: ThemeUIStyleObject = {
	'& .autocomplete__option--no-results': {
		cursor: 'pointer',
	},
};

const searchIconStyles: ThemeUIStyleObject = {
	'& .autocomplete__input.autocomplete__input': {
		paddingLeft: 6,
	},
};

const DefaultArrow = ( config: { className?: string } ) => (
	<FormSelectArrow className={ config.className } />
);

// Module-scope no-op so the default `onChange` keeps a stable reference across
// renders (an inline `() => {}` default reallocates every render and defeats memoization).
const noop = () => {};

const FormAutocomplete = React.forwardRef< AutocompleteInstance, FormAutocompleteProps >(
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
			onChange = noop,
			onInputChange,
			options = [],
			required,
			searchIcon,
			showAllValues = false,
			resetOnBlur = false, // resets the input value to the selection if the input is blurred. Returns null if selection is empty
			source,
			value,
			allowCustom = false,
			...props
		},
		forwardedRef
	) => {
		const [ isDirty, setIsDirty ] = useState( false );
		const [ sourceDebounceTimeout, setSourceDebounceTimeout ] = useState< ReturnType<
			typeof setTimeout
		> | null >( null );
		const [ selectedValue, setSelectedValue ] = useState( value || '' );
		const [ inputQuery, setInputQuery ] = useState( value );
		let debounceTimeout: ReturnType< typeof setTimeout >;
		const fallbackRef = React.useRef< AutocompleteInstance >( null );
		const acRef = (
			forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef : fallbackRef
		) as React.MutableRefObject< AutocompleteInstance >;

		const SelectLabel = () => (
			<Label required={ required } htmlFor={ forLabel }>
				{ label }
			</Label>
		);

		const inlineLabel = Boolean( isInline && label );

		const optionLabel = useCallback(
			( option: AutocompleteOption ) =>
				getOptionLabel ? getOptionLabel( option ) : option.label,
			[ getOptionLabel ]
		);

		const getAllOptions = useMemo< AutocompleteOption[] >(
			() => options.flatMap( option => option.options ?? [ option ] ),
			[ options ]
		);

		const getOptionByLabel = useCallback(
			( inputValue: string ) =>
				getAllOptions.find( option => String( optionLabel( option ) ) === String( inputValue ) ),
			[ getAllOptions, optionLabel ]
		);
		/**
		 * Reset the underlying component state to show the selected value
		 */
		const resetInputState = useCallback( () => {
			if ( resetOnBlur && acRef?.current && inputQuery !== selectedValue ) {
				// resets the input field to the selected value or the empty string
				acRef.current.setState( {
					...acRef.current.state,
					query: inputQuery && inputQuery !== '' ? selectedValue ?? '' : '', // selected value should not be null or the component will crash
				} );
			}
		}, [ acRef ] );
		// sets the internal state variables and calls the onChange callback
		const setAutocompleteState = useCallback(
			( inputValue: string | null ) => {
				setInputQuery( inputValue ?? '' );
				setSelectedValue( inputValue ?? '' );
				onChange( getOptionByLabel( inputValue ?? '' ), inputValue );
				setIsDirty( false );
			},
			[ onChange, getOptionByLabel ]
		);
		// this method gets called when we confirm the selection via click/enter
		const onValueChange = useCallback(
			( inputValue: string | null ) => {
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
			[ setAutocompleteState, resetOnBlur, inputQuery, selectedValue ]
		);

		const handleTypeChange = useCallback(
			( query: string ) => {
				const filteredOptions = options.filter(
					option =>
						String( optionLabel( option ) ).toLowerCase().indexOf( query.toLowerCase() ) >= 0
				);
				if ( allowCustom && filteredOptions.length === 0 ) {
					return [ { label: query, value: query } ];
				}
				return filteredOptions;
			},
			[ options ]
		);

		const handleInputChange = useCallback(
			( query: string ) => {
				if ( ! debounce ) {
					return onInputChange?.( query );
				}
				clearTimeout( debounceTimeout );

				if ( ! query.length || query.length >= minLength ) {
					debounceTimeout = setTimeout( () => {
						onInputChange?.( query );
					}, debounce );
				}
			},
			[ onInputChange, debounce, minLength ]
		);

		const suggest = useCallback(
			( query: string, populateResults: ( results: unknown[] ) => void ) => {
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
		const handleSource = ( query: string, populateResults: ( results: unknown[] ) => void ) => {
			setInputQuery( query );
			// user function to fetch the results has the precedence
			if ( source ) {
				if ( ! debounce ) {
					source( query, populateResults as ( results: string[] ) => void );
					return;
				}
				if ( sourceDebounceTimeout ) {
					clearTimeout( sourceDebounceTimeout );
					setSourceDebounceTimeout( null );
				}

				if ( ! query.length || query.length >= minLength ) {
					setSourceDebounceTimeout(
						setTimeout( () => {
							source( query, populateResults as ( results: string[] ) => void );
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
				?.setAttribute( 'aria-activedescendant', '' );
		}, [] );

		useEffect( () => {
			global.document
				.querySelector( '.autocomplete__menu' )
				?.setAttribute( 'aria-label', `${ String( label ) } list` );
		}, [ label ] );

		useEffect( () => {
			const input = global.document.querySelector( `#${ forLabel }` );

			if ( ! input || required === undefined ) {
				return;
			}

			input.setAttribute( 'aria-required', String( required ) );
		}, [ required ] );

		useEffect( () => {
			const input = global.document.querySelector( `#${ forLabel }` );

			if ( ! input ) {
				return;
			}

			const onKeyDown = e => {
				// pressed escape, we want to reset the status
				if ( ( e as KeyboardEvent ).keyCode === 27 && resetOnBlur ) {
					resetInputState();
				} else {
					setIsDirty( true );
				}
			};

			input.addEventListener( 'keydown', onKeyDown );

			return () => input.removeEventListener( 'keydown', onKeyDown );
		}, [ setIsDirty ] );

		// For accessibility, we need to add the error message to the aria-describedby attribute
		useEffect( () => {
			const input = global.document.querySelector( `#${ forLabel }` );

			if ( input ) {
				input.setAttribute(
					'aria-describedby',
					`describe-${ forLabel }-validation ${ input.getAttribute( 'aria-describedby' ) ?? '' }`
				);
			}
		}, [] );

		useEffect( () => {
			const input = global.document.querySelector< HTMLInputElement >( `#${ forLabel }` );

			if ( ! input ) {
				return;
			}

			const onBlur = () => {
				setInputQuery( input.value );
				resetInputState();
			};

			input.addEventListener( 'blur', onBlur );

			return () => input.removeEventListener( 'blur', onBlur );
		}, [ acRef ] );
		return (
			<div className={ classNames( 'vip-form-autocomplete-component', className ) }>
				{ label && ! isInline && <SelectLabel /> }

				<div
					sx={ {
						...defaultStyles,
						...( isInline && inlineStyles ),
						...( searchIcon && searchIconStyles ),
						...( allowCustom && allowCustomStyles ),
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
							ref={ acRef }
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

FormAutocomplete.displayName = 'FormAutocomplete';

export { FormAutocomplete };
