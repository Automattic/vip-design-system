/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import React from 'react';
import { Box, ThemeUIStyleObject } from 'theme-ui';

import { VIP_RADIO } from './Radio';
import { inputStyle, itemStyle, labelStyle } from './styles';
import { Label } from '../Label';

export type RadioOptionOptionProps = {
	/** Unique identifier for the radio input element. */
	id: string;
	/** The value submitted with the form when this option is selected. */
	value: string;
	/** Whether this individual radio option is disabled. */
	disabled?: boolean;
	/** Additional CSS class name for the option container. */
	className?: string;
	/** The text label displayed next to the radio input. */
	label?: string;
	/** A custom render function for the label, receiving label props and styles. */
	renderLabel?: ( props, labelStyles: ThemeUIStyleObject ) => JSX.Element;
	/** Additional props forwarded to the label element. */
	labelProps?: object;
	/** Additional props forwarded to the native input element. */
	inputProps?: object;
};

export interface RadioOptionProps {
	/** The configuration object for this radio option. */
	option: RadioOptionOptionProps;
	/** The name attribute shared by all radio inputs in the group. */
	name: string;
	/** The visual style variant of the radio input. */
	variant: string;
	/** Whether the radio option is disabled. */
	disabled: boolean | undefined;
	/** Callback invoked when the radio option selection changes. */
	onChangeHandler: ( e: React.ChangeEvent< HTMLInputElement > ) => void;
	/** Whether this radio option is currently selected. */
	checked: boolean;
}

/**
 * An individual radio button option within a radio group.
 * Renders a native radio input with a styled label.
 */
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
