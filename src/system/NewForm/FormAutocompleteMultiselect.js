/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import Autocomplete from 'accessible-autocomplete/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';
import { FormSelectLoading } from './FormSelectLoading';
import { FormSelectSearch } from './FormSelectSearch';
import { Button, Flex } from '../';
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
	...baseBorderTextColors,

	py: 0,
	minHeight: '36px',
	lineHeight: '36px',
	'&:focus-visible': theme => theme.outline,
	'&:focus-within': theme => theme.outline,
	'&.autocomplete__input--focused': theme => theme.outline,
	'& .autocomplete__input': {
		width: '100%',
		paddingLeft: 4,
		py: 0,
		borderWidth: 0,
		color: 'text',
		minHeight: '36px',
		lineHeight: '36px',
		'&:focus-visible': { outlineWidth: 0, boxShadow: 'none' },
		'&:focus-within': { outlineWidth: 0, boxShadow: 'none' },
		'&.autocomplete__input--focused': { outlineWidth: 0, boxShadow: 'none' },
		'&.autocomplete__input--show-all-values': { paddingRight: 7 },
		'&::placeholder': {
			color: 'input.text.placeholder',
			opacity: 1,
		},
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
		paddingLeft: 4,
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

const DefaultArrow = config => <FormSelectArrow classNames={ config.className } />;

const AddSelectionStatus = ( { status } ) => {
	return (
		<div
			sx={ {
				border: '0',
				clip: 'rect(0 0 0 0)',
				height: '1px',
				marginBottom: '-1px',
				marginRight: '-1px',
				overflow: 'hidden',
				padding: '0',
				position: 'absolute',
				whiteSpace: 'nowrap',
				width: '1px',
			} }
			id="vip-autocompletemultiselect-status"
			role="status"
			aria-atomic="true"
			aria-live="assertive"
		>
			{ status }
		</div>
	);
};

AddSelectionStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

const SelectedOptions = ( { index, option, unselectValue } ) => {
	return (
		<div key={ index } sx={ { mr: 1, maxWidth: '100%' } }>
			<Button
				variant="tertiary"
				onClick={ e => {
					e.preventDefault();
					unselectValue( option, index );
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
				<MdClose sx={ { ml: 2 } } />
			</Button>
		</div>
	);
};

SelectedOptions.propTypes = {
	index: PropTypes.number.isRequired,
	option: PropTypes.string.isRequired,
	unselectValue: PropTypes.func.isRequired,
};

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
		const OPTION_ACTION = {
			ADD: 'add',
			REMOVE: 'remove',
			NONE: 'none',
		};
		const [ isDirty, setIsDirty ] = useState( false );
		const [ selectedOptions, setSelectedOptions ] = useState( [] );
		const [ addStatus, setAddStatus ] = useState( '' );
		const [ currentOption, setCurrentOption ] = useState( {
			action: OPTION_ACTION.NONE,
			option: null,
			index: -1,
		} );
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

		const onValueChange = useCallback(
			inputValue => {
				if ( inputValue && ! selectedOptions.includes( inputValue ) ) {
					setCurrentOption( { action: OPTION_ACTION.ADD, option: inputValue } );
					setSelectedOptions( [ ...selectedOptions, inputValue ] );
				}
			},
			[ getOptionByLabel, setSelectedOptions, selectedOptions, setCurrentOption ]
		);

		const unselectValue = useCallback(
			( inputValue, index ) => {
				if ( inputValue ) {
					setSelectedOptions(
						selectedOptions.filter( option => ( option?.label || option ) !== inputValue )
					);
					setCurrentOption( {
						action: OPTION_ACTION.REMOVE,
						option: inputValue,
						index,
					} );
				}
			},
			[ getOptionByLabel, setSelectedOptions, selectedOptions, setCurrentOption ]
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
				.removeAttribute( 'aria-activedescendant' );
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

		// Update selectedOption and reset the input state on select input change

		useEffect( () => {
			onChange(
				selectedOptions,
				selectedOptions.map( option => option?.label || option )
			);
			resetInputState();
		}, [ selectedOptions ] );

		// Update the select status for screen readers
		useEffect( () => {
			if ( currentOption.action === OPTION_ACTION.ADD ) {
				setAddStatus( `${ currentOption.option } added to the list.` );
				setCurrentOption( { action: OPTION_ACTION.NONE, option: null } );
			} else if ( currentOption.index === selectedOptions.length && selectedOptions.length > 0 ) {
				// Move focus to the first selected item, if the last element is removed and there are other elements in the list
				global.document.querySelector( '.vip-button-component' ).focus();
			} else if ( selectedOptions.length === 0 ) {
				// Move focus to the input field if the last element is removed and there are no other elements in the list
				global.document.querySelector( '.autocomplete__input' ).focus();
			}
		}, [ currentOption ] );

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
						{ addStatus && <AddSelectionStatus status={ addStatus } /> }
						{ loading && <FormSelectLoading sx={ { right: showAllValues ? 7 : 3 } } /> }
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
							<SelectedOptions
								key={ idx }
								index={ idx }
								option={ option }
								unselectValue={ unselectValue }
							/>
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
