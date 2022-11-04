/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Form/Label';
import Autocomplete from 'accessible-autocomplete/react';

/**
 * Internal dependencies
 */
import css from './FormAutocomplete.css';
import { FormSelectContent } from './FormSelectContent';
import { FormSelectArrow } from './FormSelectArrow';

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
		paddingRight: '40px',
	},
	'& .autocomplete__input--show-all-values': {
		paddingRight: 0,
	},
};

const inlineStyles = {
	borderWidth: 0,
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
			onChange,
			value,
			showAllValues = true,
			displayMenu = 'overlay',
			id = 'vip-autocomplete',
			...props
		},
		forwardRef
	) => {
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

		const suggest = useCallback(
			( query, populateResults ) => {
				const data = options.filter(
					option => optionLabel( option ).toLowerCase().indexOf( query.toLowerCase() ) >= 0
				);
				populateResults( data.map( option => optionLabel( option ) ) );
			},
			[ options ]
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

		return (
			<>
				{ label && ! isInline && <SelectLabel /> }

				<div sx={ { ...defaultStyles, ...( isInline && inlineStyles ) } }>
					<FormSelectContent
						isInline={ inlineLabel }
						label={ inlineLabel ? <SelectLabel /> : null }
					>
						<Autocomplete
							id={ id }
							showAllValues={ showAllValues }
							ref={ forwardRef }
							source={ suggest }
							defaultValue={ value }
							displayMenu={ displayMenu }
							onConfirm={ onValueChange }
							{ ...props }
						/>
						<FormSelectArrow />
					</FormSelectContent>
				</div>
			</>
		);
	}
);

FormAutocomplete.propTypes = {
	id: PropTypes.string,
	showAllValues: PropTypes.bool,
	isInline: PropTypes.bool,
	forLabel: PropTypes.string,
	value: PropTypes.string,
	displayMenu: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	getOptionLabel: PropTypes.func,
	getOptionValue: PropTypes.func,
	onChange: PropTypes.func,
};

FormAutocomplete.displayName = 'FormAutocomplete';

export { FormAutocomplete, css };
