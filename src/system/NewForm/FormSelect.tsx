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
import { Box } from '../Box';
import { Validation } from '../Form';
import { baseControlStyle } from '../Form/Input.styles';
import { Label } from '../Form/Label';
import { ControlSize, getControlHeight } from '../types/controlSize';

const MAX_SUGGESTED_OPTIONS = 15;
const ICON_SIZE = 24;
const isDev = process.env.NODE_ENV !== 'production';

const getSelectStyles = ( size: ControlSize = 'large' ): ThemeUIStyleObject => {
	const height = getControlHeight( size );
	return {
		...baseControlStyle,
		paddingLeft: size === 'small' ? 3 : 3,
		paddingRight: size === 'small' ? 6 : 7,
		py: 0,
		appearance: 'none' as const,
		minHeight: height,
		lineHeight: height,
		fontFamily: 'inherit',
		fontSize: 2,
	};
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
	size?: ControlSize;
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
			size = 'large',
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
						sx={ { cursor: disabled ? 'not-allowed' : 'pointer', ...getSelectStyles( size ) } }
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
					<FormSelectArrow iconSize={ ICON_SIZE } />
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
