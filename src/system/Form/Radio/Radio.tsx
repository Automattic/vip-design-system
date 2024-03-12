/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React, { Ref, forwardRef, useCallback } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { RadioOption } from './RadioOption';

export const VIP_RADIO = 'vip-radio-component';

export type RadioOptionOptionProps = {
	id: string;
	value: string;
	disabled?: boolean;
	className?: string;
	label?: string;
	renderLabel?: ( props, labelStyles: ThemeUIStyleObject ) => JSX.Element | null;
	labelProps?: object;
	inputProps?: object;
};

export interface RadioOptionProps {
	option: RadioOptionOptionProps;
	name: string;
	variant: string;
	disabled: boolean | undefined;
	onChangeHandler: ( e: React.ChangeEvent< HTMLInputElement > ) => void;
	checked: boolean;
}

export type RadioProps = {
	variant?: string;
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

		const onChangeHandler = useCallback( ( e: React.ChangeEvent< HTMLInputElement > ) => {
			const optionTriggered = options.find( option => {
				const optionValue = `${ option.value }`;
				const selectedOptionValue = `${ e.target.value }`;

				return optionValue === selectedOptionValue;
			} );

			if ( onChange ) {
				onChange( e, optionTriggered );
			}
		}, [] );

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
