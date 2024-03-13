/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React from 'react';
import { Box, ThemeUIStyleObject } from 'theme-ui';

import { VIP_RADIO } from './Radio';
import { inputStyle, itemStyle, labelStyle } from './styles';
import { Label } from '../Label';

export type RadioOptionOptionProps = {
	id: string;
	value: string;
	disabled?: boolean;
	className?: string;
	label?: string;
	renderLabel?: ( props, labelStyles: ThemeUIStyleObject ) => JSX.Element;
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

const RadioOption = ( {
	option: { id, value, className, label, renderLabel, labelProps = {}, inputProps = {} },
	name,
	variant,
	disabled,
	onChangeHandler,
	checked,
}: RadioOptionProps ) => {
	const commonLabelProps = {
		className: `${ VIP_RADIO }item-label`,
		htmlFor: id,
		...labelProps,
	};

	return (
		<Box
			as="div"
			sx={ itemStyle }
			className={ classNames(
				`${ VIP_RADIO }item`,
				`${ VIP_RADIO }item-${ id }`,
				checked ? `${ VIP_RADIO }item-checked` : '',
				className
			) }
		>
			<input
				type="radio"
				id={ id }
				aria-disabled={ disabled }
				name={ name }
				value={ `${ value }` }
				sx={ inputStyle( variant ) }
				onChange={ onChangeHandler }
				className={ `${ VIP_RADIO }item-input` }
				checked={ checked }
				{ ...inputProps }
			/>

			{ renderLabel ? (
				renderLabel( commonLabelProps, labelStyle( variant ) )
			) : (
				<Label { ...commonLabelProps } sx={ labelStyle( variant ) }>
					{ label }
				</Label>
			) }
		</Box>
	);
};

export { RadioOption };
