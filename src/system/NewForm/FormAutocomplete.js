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
import './FormAutocomplete.css';
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
		borderWidth: '0px',
		color: 'text',
		minHeight: '36px',
		lineHeight: '36px',
		'&:focus': { outlineWidth: '0px', boxShadow: 'none' },
		'&:focus-visible': { outlineWidth: '0px', boxShadow: 'none' },
		'&:focus-within': { outlineWidth: '0px', boxShadow: 'none' },
		'&.autocomplete__input--focused': { outlineWidth: '0px', boxShadow: 'none' },
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
	borderWidth: '0px',
};

const FormAutocomplete = React.forwardRef(
	(
		{
			isInline,
			forLabel,
			options,
			label,
			getOptionValue,
			onChange,
			value,
			showAllValues = true,
			displayMenu = 'overlay',
			id = 'autocomplete',
		},
		forwardRef
	) => {
		const SelectLabel = () => <Label htmlFor={ forLabel || id }>{ label }</Label>;

		const inlineLabel = !! ( isInline && label );

		const optionValue = useCallback(
			option => ( getOptionValue ? getOptionValue( option ) : option.value ),
			[ getOptionValue ]
		);

		const getAllOptions = useMemo(
			() =>
				[
					...options.filter( option => ! option.options ),
					...options.filter( option => option.options ).map( option => option.options ),
				].reduce( ( a, b ) => a.concat( b ), [] ),
			[ options ]
		);

		const getOptionByValue = useCallback(
			inputValue =>
				getAllOptions.find( option => `${ optionValue( option ) }` === `${ inputValue }` ),
			[ getAllOptions, optionValue ]
		);

		const onValueChange = useCallback(
			inputValue => {
				if ( onChange ) {
					onChange( getOptionByValue( inputValue ) );
				}
			},
			[ onChange, getOptionByValue ]
		);

		const suggest = useCallback(
			( query, populateResults ) => {
				const data = options.filter(
					option => option.label.toLowerCase().indexOf( query.toLowerCase() ) >= 0
				);
				populateResults( data.map( option => option.label ) );
			},
			[ options ]
		);

		useEffect( () => {
			document.querySelector( '.autocomplete__input' ).setAttribute( 'aria-activedescendant', '' );
		}, [] );

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
	getOptionValue: PropTypes.func,
	onChange: PropTypes.func,
};

FormAutocomplete.displayName = 'FormAutocomplete';

export { FormAutocomplete };
