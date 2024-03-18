/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React, { Ref, forwardRef } from 'react';

import { RadioOption, RadioOptionOptionProps } from './RadioOption';

export const VIP_RADIO = 'vip-radio-component';

export type RadioProps = {
	variant?: 'primary' | 'success' | 'brand' | 'disabled';
	disabled?: boolean | undefined;
	defaultValue?: string | number;
	onChange?: ( e: React.ChangeEvent< HTMLInputElement >, option?: RadioOptionOptionProps ) => void;
	name?: string;
	options?: RadioOptionOptionProps[];
	className?: string;
};

const Radio = forwardRef< HTMLDivElement, RadioProps >(
	(
		{
			variant = 'primary',
			disabled = false,
			defaultValue,
			onChange,
			name = '',
			options = [],
			className,
			...props
		}: RadioProps,
		ref: Ref< HTMLDivElement >
	) => {
		// If disabled is pass globally, it will overwrite the variant
		if ( disabled === true || disabled === undefined ) {
			variant = 'disabled';
		}

		const onChangeHandler = ( e: React.ChangeEvent< HTMLInputElement > ) => {
			const optionTriggered = options.find( option => {
				const optionValue = `${ option.value }`;
				const selectedOptionValue = `${ e.target.value }`;

				return optionValue === selectedOptionValue;
			} );

			if ( onChange ) {
				onChange( e, optionTriggered );
			}
		};

		const renderedOptions = options.map( option => (
			<RadioOption
				variant={ option?.disabled ? 'disabled' : variant }
				key={ option?.id }
				name={ name }
				option={ option }
				disabled={ disabled || option?.disabled }
				onChangeHandler={ onChangeHandler }
				checked={ `${ defaultValue }` === `${ option?.value }` }
			/>
		) );

		return (
			<div
				ref={ ref }
				className={ classNames( VIP_RADIO, `${ VIP_RADIO }-${ name }`, className ) }
				{ ...props }
			>
				{ renderedOptions }
			</div>
		);
	}
);

export { Radio };
