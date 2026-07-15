/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback, useMemo } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { FormSelectArrow } from './FormSelectArrow';
import { FormSelectContent } from './FormSelectContent';
import { Box } from '../Box/Box';
import { baseControlStyle } from '../Form/Input.styles';
import { Label } from '../Form/Label';
import { Validation } from '../Form/Validation';

const MAX_SUGGESTED_OPTIONS = 15;
const ICON_SIZE = 24;
const isDev = process.env.NODE_ENV !== 'production';

const defaultStyles: ThemeUIStyleObject = {
	...baseControlStyle,
	paddingLeft: 3,
	paddingRight: 7,
	py: 0,
	appearance: 'none' as const,
	minHeight: '36px',
	lineHeight: '36px',
	fontFamily: 'inherit',
	fontSize: '1em',
};

interface Option {
	label: string;
	value: string | number;
	options?: Option[];
}

interface FormSelectProps {
	disabled?: boolean;
	isInline?: boolean;
	placeholder?: string;
	forLabel?: string;
	options: Option[];
	required?: boolean;
	label?: string;
	separator?: boolean;
	getOptionLabel?: ( option: Option ) => string;
	getOptionValue?: ( option: Option ) => string | number;
	onChange?: ( option: Option | undefined, event: React.ChangeEvent< HTMLSelectElement > ) => void;
	hasError?: boolean;
	errorMessage?: string;
	wrapperSx?: ThemeUIStyleObject;
	value?: string | number;
	className?: string;
	'aria-describedby'?: string;
	'aria-required'?: boolean;
	id?: string;
}

const renderOption = ( label: string, value: string | number ) => {
	return (
		<option key={ value } value={ value }>
			{ label }
		</option>
	);
};

const renderGroup = ( groupLabel: string, groupOptions: Option[] ) => {
	return (
		<optgroup key={ groupLabel } label={ groupLabel }>
			{ groupOptions.map( ( { label, value } ) => renderOption( label, value ) ) }
		</optgroup>
	);
};

const FormSelect = React.forwardRef< HTMLSelectElement, FormSelectProps >(
	(
		{
			disabled,
			isInline,
			placeholder,
			forLabel = 'vip-form-select',
			options,
			required,
			label,
			getOptionLabel,
			getOptionValue,
			onChange,
			hasError,
			errorMessage,
			wrapperSx,
			separator = true,
			...props
		},
		forwardRef
	) => {
		if ( isDev && options.length > MAX_SUGGESTED_OPTIONS ) {
			// eslint-disable-next-line no-console
			console.info(
				'For 16 or more items, consider using another component with a typeahead capability.'
			);
		}

		const getAllOptions = useMemo(
			() => [
				...options.filter( option => ! option.options ),
				...options.filter( option => option.options ).flatMap( option => option.options || [] ),
			],
			[ options ]
		);

		const optionLabel = useCallback(
			( option: Option ) => ( getOptionLabel ? getOptionLabel( option ) : option.label ),
			[ getOptionLabel ]
		);

		const optionValue = useCallback(
			( option: Option ) => ( getOptionValue ? getOptionValue( option ) : option.value ),
			[ getOptionValue ]
		);

		const getOptionByValue = useCallback(
			( value: string ) =>
				getAllOptions.find( option => `${ optionValue( option ) }` === `${ value }` ),
			[ getAllOptions, optionValue ]
		);

		const onValueChange = useCallback(
			( event: React.ChangeEvent< HTMLSelectElement > ) =>
				onChange
					? onChange( getOptionByValue( event.target.value ), event )
					: getOptionByValue( event.target.value ),
			[ onChange, getOptionByValue ]
		);

		const SelectLabel = () => (
			<Label sx={ { lineHeight: `${ ICON_SIZE }px` } } required={ required } htmlFor={ forLabel }>
				{ label }
			</Label>
		);

		const inlineLabel = Boolean( isInline && label );

		return (
			<Box sx={ { ...wrapperSx } }>
				{ label && ! isInline && <SelectLabel /> }

				<FormSelectContent isInline={ inlineLabel } label={ inlineLabel ? <SelectLabel /> : null }>
					<select
						onChange={ onValueChange }
						ref={ forwardRef }
						sx={ {
							cursor: disabled ? 'not-allowed' : 'pointer',
							...defaultStyles,
							...( ! separator && { paddingRight: 6 } ),
						} }
						required={ required }
						disabled={ disabled }
						aria-required={ required }
						aria-describedby={ hasError ? `describe-${ forLabel }-validation` : undefined }
						id={ forLabel }
						{ ...props }
					>
						{ placeholder && <option>{ placeholder }</option> }
						{ options.map( ( { options: groupOptions, ...option } ) =>
							groupOptions
								? renderGroup( optionLabel( option ), groupOptions )
								: renderOption( optionLabel( option ), optionValue( option ) )
						) }
					</select>
					<FormSelectArrow iconSize={ ICON_SIZE } separator={ separator } />
				</FormSelectContent>

				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ forLabel }>
						{ errorMessage }
					</Validation>
				) }
			</Box>
		);
	}
);

FormSelect.displayName = 'FormSelect';

export { FormSelect };
export type { FormSelectProps, Option };
