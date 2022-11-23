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
import css from './FormAutocomplete.css';
import { FormSelectContent } from './FormSelectContent';
import { FormSelectArrow } from './FormSelectArrow';
import { Label } from '../Form/Label';
import { FormSelectSearch } from './FormSelectSearch';

const defaultStyles = {
	width: '100%',
	py: 0,
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: 'border',
	borderRadius: 1,
	backgroundColor: 'background',
	color: 'text',
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
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: 'border',
		borderRadius: 1,
		backgroundColor: 'background',
		color: 'text',
	},
	'& .autocomplete__hint, & .autocomplete__input, & .autocomplete__option': {
		fontSize: 'inherit',
	},
	'& .autocomplete__wrapper': {
		width: '100%',
	},
	'& .autocomplete__option': {
		borderColor: 'borders.2',
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

const FormAutocomplete = React.forwardRef(
	(
		{
			isInline,
			forLabel,
			options,
			label,
			getOptionLabel,
			getOptionValue,
			onChange = () => {},
			onInputChange,
			value,
			showAllValues = true,
			searchIcon = false,
			displayMenu = 'overlay',
			noOptionsMessage = () => 'No results found.',
			id = 'vip-autocomplete',
			className,
			...props
		},
		forwardRef
	) => {
		const [ isDirty, setIsDirty ] = useState( false );

		const SelectLabel = () => <Label htmlFor={ forLabel || id }>{ label }</Label>;

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

		const onValueChange = useCallback(
			inputValue => {
				if ( inputValue ) {
					onChange( getOptionByLabel( inputValue ), inputValue );
				}
			},
			[ onChange, getOptionByLabel ]
		);

		const handleTypeChange = useCallback(
			query =>
				options.filter(
					option => optionLabel( option ).toLowerCase().indexOf( query.toLowerCase() ) >= 0
				),
			[ options ]
		);

		const suggest = useCallback(
			( query, populateResults ) => {
				let data = options;
				if ( isDirty ) {
					data = onInputChange ? onInputChange( query ) : handleTypeChange( query );
				}
				populateResults( data.map( option => optionLabel( option ) ) );
			},
			[ options, isDirty ]
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
			global.document.querySelector( `#${ id }` ).addEventListener( 'keydown', () => {
				setIsDirty( true );
			} );
		}, [ setIsDirty ] );

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
							id={ id }
							showAllValues={ showAllValues }
							ref={ forwardRef }
							source={ suggest }
							defaultValue={ value }
							displayMenu={ displayMenu }
							onConfirm={ onValueChange }
							tNoResults={ noOptionsMessage }
							{ ...props }
						/>
						<FormSelectArrow />
					</FormSelectContent>
				</div>
			</div>
		);
	}
);

FormAutocomplete.propTypes = {
	id: PropTypes.string,
	showAllValues: PropTypes.bool,
	searchIcon: PropTypes.bool,
	isInline: PropTypes.bool,
	forLabel: PropTypes.string,
	value: PropTypes.string,
	displayMenu: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	getOptionLabel: PropTypes.func,
	getOptionValue: PropTypes.func,
	onInputChange: PropTypes.func,
	noOptionsMessage: PropTypes.func,
	onChange: PropTypes.func,
	className: PropTypes.any,
};

FormAutocomplete.displayName = 'FormAutocomplete';

export { FormAutocomplete, css };
