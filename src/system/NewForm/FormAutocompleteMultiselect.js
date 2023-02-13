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
import { Button, Flex } from '../';
import ScreenReaderText from '../ScreenReaderText';
import { MdClose } from 'react-icons/md';

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
	'& .autocomplete__input.autocomplete__input': {
		paddingLeft: 4,
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
		forwardRef = forwardRef || React.createRef();

		/**
		 * Reset the underlying component state to show the selected value
		 */
		const resetInputState = useCallback( () => {
			if ( forwardRef?.current ) {
				// resets the input field to the selected value or the empty string
				forwardRef.current.setState( {
					...forwardRef.current.state,
					query: '', // selected value should not be null or the component will crash
				} );
			}
		}, [ forwardRef ] );

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

		const getOptionByLabel = useCallback(
			inputValue =>
				getAllOptions.find( option => `${ optionLabel( option ) }` === `${ inputValue }` ),
			[ getAllOptions, optionLabel ]
		);

		const getAllOptions = useMemo(
			() =>
				[
					...options.filter( option => ! option.options ),
					...options.filter( option => option.options ).map( option => option.options ),
				].reduce( ( a, b ) => a.concat( b ), [] ),
			[ options ]
		);

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
				const optionForDisplay = data?.map( option => optionLabel( option ) );
				populateResults(
					optionForDisplay.filter( option => ! selectedOptions.includes( option ) )
				);
			},
			[ autoFilter, isDirty, onInputChange, options, selectedOptions ]
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

		// Reset the input state on input blur
		useEffect( () => {
			global.document.querySelector( `#${ forLabel }` ).addEventListener( 'blur', () => {
				resetInputState();
			} );
		}, [ forwardRef ] );

		// Update selectedOption and reset the input state on select input change
		useEffect( () => {
			onChange(
				selectedOptions,
				selectedOptions.map( option => option?.label || option )
			);
			resetInputState();
		}, [ selectedOptions ] );

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
						{ loading && <FormSelectLoading sx={ { right: showAllValues ? 40 : 10 } } /> }
					</FormSelectContent>
				</div>
				<Flex sx={ { mt: 2, justifyContent: 'space-between' } }>
					{ hasError && errorMessage && (
						<Validation isValid={ false } describedId={ forLabel }>
							{ errorMessage }
						</Validation>
					) }
					<div sx={ { fontSize: 1 } }>
						{ selectedOptions.length } item{ selectedOptions.length > 1 ? 's' : '' } selected
					</div>
				</Flex>
				<div sx={ { display: 'inline-flex', flexWrap: 'wrap', maxWidth: '100%' } }>
					{ selectedOptions &&
						selectedOptions.map( ( option, idx ) => (
							<div key={ idx } sx={ { mr: 1, maxWidth: '100%' } }>
								<Button
									variant="tertiary"
									onClick={ e => {
										e.preventDefault();
										unselectValue( option );
									} }
									sx={ {
										mt: 1,
										fontSize: 1,
										maxWidth: '100%',
									} }
								>
									<div
										sx={ {
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										} }
									>
										{ option }
									</div>
									<ScreenReaderText>
										selected. Press Space or Enter to remove.
										{ idx === 0 ? ' Press Shift Tab to add	more.' : '' }
									</ScreenReaderText>
									<MdClose sx={ { ml: 2 } } />
								</Button>
							</div>
						) ) }
				</div>
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
