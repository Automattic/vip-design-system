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
import { FormAutocompleteMultiselectBadge } from './FormAutocompleteMultiselectBadge';
import { FormAutocompleteMultiselectButton } from './FormAutocompleteMultiselectButton';
import { FormAutocompleteMultiselectInlineChip } from './FormAutocompleteMultiselectInlineChip';
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';
import { FormSelectLoading } from './FormSelectLoading';
import { FormSelectSearch } from './FormSelectSearch';
import { Flex } from '../Flex/Flex';
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

/** An option represented either as a plain string or an option object. */
export type MultiselectValue = string | AutocompleteOption;

// `accessible-autocomplete/react` ships no types; we hold a ref to its class instance to call its imperative API.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AutocompleteInstance = any;

export interface FormAutocompleteMultiselectProps {
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
	/** Validation message shown when `hasError` is true. */
	errorMessage?: ReactNode;
	/**
	 * `id`/`htmlFor` value for the input and label.
	 * @default 'vip-autocompletemultiselect'
	 */
	forLabel?: string;
	/** Returns the display label for an option. */
	getOptionLabel?: ( option: AutocompleteOption ) => string;
	/** Returns the value for an option. */
	getOptionValue?: ( option: AutocompleteOption ) => string;
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
	/** Called when the selection changes; receives the selected options and their labels. */
	onChange?: ( selected: MultiselectValue[], labels: unknown[] ) => void;
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
	/** Custom source function for fetching results. */
	source?: ( query: string, populateResults: ( results: string[] ) => void ) => void;
	/** The current input value. */
	value?: string;
	/**
	 * How selected items are rendered.
	 * @default 'button'
	 */
	listType?: 'button' | 'badge';
	/**
	 * The initial set of selected options.
	 * @default []
	 */
	initialValue?: MultiselectValue[];
	/**
	 * Whether to allow arbitrary (custom) values not in the options.
	 * @default false
	 */
	allowCustom?: boolean;
	/** Layout variant; the value `'inline-chips'` renders selected items as inline chips. */
	variant?: string;
	/** Placeholder text forwarded to the underlying autocomplete input. */
	placeholder?: string;
}

const escapeHtml = ( str: unknown ) =>
	String( str )
		.replace( /&/g, '&amp;' )
		.replace( /</g, '&lt;' )
		.replace( />/g, '&gt;' )
		.replace( /"/g, '&quot;' )
		.replace( /'/g, '&#039;' );

const baseBorderTextColors: ThemeUIStyleObject = {
	...baseControlBorderStyle,
	backgroundColor: 'layer.2',
	color: inputBaseText,
	borderRadius: 1,
};

const defaultStyles: ThemeUIStyleObject = {
	width: '100%',
	...baseBorderTextColors,

	py: 0,
	minHeight: '36px',
	lineHeight: '36px',
	'&:focus-visible': ( theme: ThemeProps ) => theme.outline,
	'&:focus-within': ( theme: ThemeProps ) => theme.outline,
	'&.autocomplete__input--focused': ( theme: ThemeProps ) => theme.outline,
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

const inlineStyles: ThemeUIStyleObject = {
	borderWidth: 0,
};

const searchIconStyles: ThemeUIStyleObject = {
	'& .autocomplete__input.autocomplete__input': {
		paddingLeft: 6,
	},
};

const inlineChipsContainerStyles: ThemeUIStyleObject = {
	...defaultStyles,
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	p: 1,
	pr: 5,
	position: 'relative',
	'& .autocomplete__input': {
		...( defaultStyles[ '& .autocomplete__input' ] as ThemeUIStyleObject ),
		lineHeight: '24px',
		minHeight: '24px',
	},
	'&:focus-within': ( theme: ThemeProps ) => theme.outline,
	'& .autocomplete__wrapper': {
		position: 'static',
		width: '100%',
		lineHeight: '24px',
		minHeight: '24px',
		'& .autocomplete__dropdown-arrow-down': {
			top: '6px',
			bottom: 'unset',
		},
	},
};

const DefaultArrow = ( config: { className?: string } ) => (
	<FormSelectArrow className={ config.className } separator={ false } />
);

const AddSelectionStatus = ( { status }: { status?: ReactNode } ) => {
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

const FormAutocompleteMultiselect = React.forwardRef<
	AutocompleteInstance,
	FormAutocompleteMultiselectProps
>(
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
			listType = 'button',
			initialValue = [],
			allowCustom = false,
			variant,
			...props
		},
		forwardedRef
	) => {
		const isInlineChips = variant === 'inline-chips';
		const OPTION_ACTION = {
			ADD: 'add',
			REMOVE: 'remove',
			NONE: 'none',
		};
		const ListComponent =
			listType === 'button' ? FormAutocompleteMultiselectButton : FormAutocompleteMultiselectBadge;
		const [ isDirty, setIsDirty ] = useState( false );
		const [ selectedOptions, setSelectedOptions ] = useState< MultiselectValue[] >( initialValue );
		const [ addStatus, setAddStatus ] = useState< ReactNode >( '' );
		const [ currentOption, setCurrentOption ] = useState< {
			action: string;
			option: MultiselectValue | null;
			index?: number;
		} >( {
			action: OPTION_ACTION.NONE,
			option: null,
			index: -1,
		} );
		const justSelectedRef = React.useRef( false );
		let debounceTimeout: ReturnType< typeof setTimeout >;
		const fallbackRef = React.useRef< AutocompleteInstance >( null );
		const acRef = (
			forwardedRef && typeof forwardedRef !== 'function' ? forwardedRef : fallbackRef
		) as React.MutableRefObject< AutocompleteInstance >;

		/**
		 * Reset the underlying component state to show the selected value
		 */
		const resetInputState = useCallback( () => {
			if ( acRef?.current ) {
				// resets the input field to the selected value or the empty string
				acRef.current.setState( {
					...acRef.current.state,
					query: '', // selected value should not be null or the component will crash
				} );
			}
		}, [ acRef ] );

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

		const onValueChange = useCallback(
			( inputValue: MultiselectValue ) => {
				if ( inputValue && ! selectedOptions.includes( inputValue ) ) {
					setCurrentOption( { action: OPTION_ACTION.ADD, option: inputValue } );
					setSelectedOptions( [ ...selectedOptions, inputValue ] );
				}
			},
			[ getOptionByLabel, setSelectedOptions, selectedOptions, setCurrentOption ]
		);

		const unselectValue = useCallback(
			( inputValue: MultiselectValue, index?: number ) => {
				if ( inputValue ) {
					setSelectedOptions(
						selectedOptions.filter(
							option => ( ( option as AutocompleteOption )?.label || option ) !== inputValue
						)
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
			[ options, allowCustom ]
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
				const optionForDisplay = data?.map( option => optionLabel( option ) );
				if ( isInlineChips ) {
					populateResults( optionForDisplay );
				} else {
					populateResults(
						optionForDisplay.filter(
							option => ! selectedOptions.includes( option as MultiselectValue )
						)
					);
				}
			},
			[ autoFilter, isDirty, isInlineChips, onInputChange, options, selectedOptions ]
		);

		const onValueChangeInlineChips = useCallback(
			( inputValue: MultiselectValue ) => {
				if ( ! inputValue ) {
					return;
				}
				justSelectedRef.current = true;
				if ( selectedOptions.includes( inputValue ) ) {
					unselectValue( inputValue, selectedOptions.indexOf( inputValue ) );
				} else {
					setCurrentOption( { action: OPTION_ACTION.ADD, option: inputValue } );
					setSelectedOptions( [ ...selectedOptions, inputValue ] );
				}
			},
			[ selectedOptions, unselectValue ]
		);

		const inlineChipsTemplates = useMemo(
			() => ( {
				suggestion: ( suggestion: MultiselectValue ) => {
					const isSelected = selectedOptions.includes( suggestion );
					const check = isSelected ? '&#10003;' : '';
					return `<span style="display:flex;align-items:center;gap:8px"><span style="width:16px;flex-shrink:0">${ check }</span>${ escapeHtml(
						suggestion
					) }</span>`;
				},
			} ),
			[ selectedOptions ]
		);

		useEffect( () => {
			global.document
				.querySelector( '.autocomplete__input' )
				?.removeAttribute( 'aria-activedescendant' );
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

			const onKeyDown = () => {
				setIsDirty( true );
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

		// Update selectedOption and reset the input state on select input change

		useEffect( () => {
			onChange(
				selectedOptions,
				selectedOptions.map( option => ( option as AutocompleteOption )?.label || option )
			);
			if ( isInlineChips && justSelectedRef.current && acRef?.current ) {
				justSelectedRef.current = false;
				acRef.current.setState( {
					...acRef.current.state,
					query: '',
					menuOpen: true,
				} );
			} else {
				resetInputState();
			}
		}, [ selectedOptions ] );

		// Update the select status for screen readers
		useEffect( () => {
			if ( currentOption.action === OPTION_ACTION.ADD ) {
				setAddStatus( `${ String( currentOption.option ) } added to the list.` );
				setCurrentOption( { action: OPTION_ACTION.NONE, option: null } );
			} else if ( currentOption.action === OPTION_ACTION.REMOVE ) {
				setAddStatus( `${ String( currentOption.option ) } removed from the list.` );
				if ( isInlineChips ) {
					global.document.querySelector< HTMLElement >( `#${ forLabel }` )?.focus();
				} else if ( currentOption.index === selectedOptions.length && selectedOptions.length > 0 ) {
					global.document.querySelector< HTMLElement >( '.vip-button-component' )?.focus();
				} else if ( selectedOptions.length === 0 ) {
					global.document.querySelector< HTMLElement >( '.autocomplete__input' )?.focus();
				}
				setCurrentOption( { action: OPTION_ACTION.NONE, option: null } );
			}
		}, [ currentOption ] );

		if ( isInlineChips ) {
			return (
				<div className={ classNames( 'vip-form-autocomplete-component', className ) }>
					{ label && <SelectLabel /> }
					<div sx={ inlineChipsContainerStyles }>
						{ selectedOptions.map( ( option, idx ) => (
							<FormAutocompleteMultiselectInlineChip
								key={ idx }
								index={ idx }
								option={ option as string }
								unselectValue={ unselectValue }
							/>
						) ) }
						<div sx={ { flex: '1 1 120px', minWidth: '120px', mr: -5 } }>
							<Autocomplete
								id={ forLabel }
								aria-busy={ loading }
								showAllValues={ true }
								ref={ acRef }
								source={ source || suggest }
								defaultValue={ value }
								displayMenu={ displayMenu }
								onConfirm={ onValueChangeInlineChips }
								tNoResults={ noOptionsMessage }
								required={ required }
								dropdownArrow={ dropdownArrow }
								confirmOnBlur={ false }
								templates={ inlineChipsTemplates }
								{ ...props }
								placeholder={
									selectedOptions.length > 0 ? '' : ( props.placeholder as string ) || ''
								}
							/>
						</div>
						{ addStatus && <AddSelectionStatus status={ addStatus } /> }
						{ loading && <FormSelectLoading sx={ { right: 7 } } /> }
					</div>
					{ hasError && errorMessage && (
						<Flex sx={ { mt: 2 } }>
							<Validation isValid={ false } describedId={ forLabel }>
								{ errorMessage }
							</Validation>
						</Flex>
					) }
				</div>
			);
		}

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
							ref={ acRef }
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
						{ selectedOptions.length } item{ selectedOptions.length === 1 ? '' : 's' } selected
					</div>
				</Flex>
				<div sx={ { display: 'inline-flex', flexWrap: 'wrap', maxWidth: '100%' } }>
					{ selectedOptions &&
						selectedOptions.map( ( option, idx ) => (
							<ListComponent
								key={ idx }
								index={ idx }
								option={ option as string }
								unselectValue={ unselectValue }
							/>
						) ) }
				</div>
			</div>
		);
	}
);

FormAutocompleteMultiselect.displayName = 'FormAutocompleteMultiselect';

export { FormAutocompleteMultiselect };
