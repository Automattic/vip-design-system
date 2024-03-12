/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React from 'react';
import { Box } from 'theme-ui';

import { VIP_RADIO, type RadioOptionProps } from './Radio';
import { inputStyle, itemStyle, labelStyle } from './styles';
import { Label } from '../Label';

const RadioOption = ( {
	option: {
		id,
		value,
		className,
		label,
		renderLabel = () => null,
		labelProps = {},
		inputProps = {},
	},
	name,
	variant,
	disabled,
	onChangeHandler,
	checked,
}: RadioOptionProps ) => (
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

		{ ! label && renderLabel ? (
			renderLabel( labelProps, labelStyle( variant ) )
		) : (
			<Label
				className={ `${ VIP_RADIO }item-label` }
				htmlFor={ id }
				sx={ labelStyle( variant ) }
				{ ...labelProps }
			>
				{ label }
			</Label>
		) }
	</Box>
);

export { RadioOption };
