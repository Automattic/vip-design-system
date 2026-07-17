/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React, { Ref } from 'react';

import { RadioOption, RadioOptionOptionProps } from './RadioOption';

export const VIP_RADIO = 'vip-radio-component';

export type RadioProps = {
	/**
	 * The visual style variant.
	 * @default 'primary'
	 */
	variant?: 'primary' | 'success' | 'brand' | 'disabled';
	/**
	 * Disables all radio options.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/** The initially selected value. */
	defaultValue?: string | number;
	/** Callback fired when the selected option changes. */
	onChange?: ( e: React.ChangeEvent< HTMLInputElement >, option?: RadioOptionOptionProps ) => void;
	/** The HTML name attribute shared by all radio inputs in the group. */
	name?: string;
	/** The list of radio options to render. */
	options?: RadioOptionOptionProps[];
	/** Additional CSS class name. */
	className?: string;
	/** Ref forwarded to the radio group container element. */
	ref?: Ref< HTMLDivElement >;
};

const Radio = ( {
	variant = 'primary',
	disabled = false,
	defaultValue,
	onChange,
	name = '',
	options = [],
	className,
	ref,
	...props
}: RadioProps ) => {
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
};

export { Radio };
