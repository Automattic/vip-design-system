/* eslint-disable max-len */
/** @jsxImportSource theme-ui */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Box, ThemeUIStyleObject } from 'theme-ui';

import { screenReaderTextClass } from '../../ScreenReaderText/ScreenReaderText';
import { baseControlBorderStyle, inputBaseText } from '../Input.styles';
import { Label } from '../Label';

const prefix = 'vip-radio-component-';

const itemStyle: ThemeUIStyleObject = {
	display: 'flex',
	alignItems: 'center',
	my: 2,
};

// The output willl be 16px because of the 1px border.
const RADIO_SIZE = '14px';

const inputStyle = ( variant: string ): ThemeUIStyleObject => ( {
	...screenReaderTextClass,
	width: `${ RADIO_SIZE }`,
	height: `${ RADIO_SIZE }`,
	'&:focus ~ label:before': {
		variant: 'outline',
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
		left: -5,
	},
	'&:checked ~ label::after': {
		borderColor: variant,
		opacity: 1,
	},
	'&[aria-disabled="true"] ~ label::before': {
		backgroundColor: variant,
		borderColor: variant,
	},
} );

const labelStyle = ( variant: string ): ThemeUIStyleObject => ( {
	cursor: 'pointer',
	position: 'relative',
	marginLeft: 5,
	marginBottom: 0,
	userSelect: 'none',
	color: inputBaseText,
	lineHeight: 'body',
	'&:before, &:after': {
		borderRadius: '100%',
		position: 'absolute',
		top: 1,
		left: -5,
		transition: 'all .3s ease-out',
		width: `${ RADIO_SIZE }`,
		height: `${ RADIO_SIZE }`,
	},
	'&::before': {
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
	},
	'&::after': {
		content: '""',
		backgroundColor: variant,
		backgroundSize: '100%',
		backgroundRepeat: 'no-repeat',
		backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.25' fill='%23fff'/%3E%3C/svg%3E")`,
		border: '1px solid',
		color: 'white',
		opacity: 0,
	},
} );

interface RadioOptionProps {
	option: {
		id: string;
		value: string | number;
		disabled?: boolean;
		className?: string;
		label?: string | React.ReactNode;
		labelProps: object;
	};
	name: string;
	variant: string;
	disabled: boolean;
	onChangeHandler: ( e: React.ChangeEvent< HTMLInputElement > ) => void;
	checked: boolean;
}

const RadioOption = ( {
	option: { id, value, disabled: ignoreDisabled, className, label, labelProps = {}, ...restOption },
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
			`${ prefix }item`,
			`${ prefix }item-${ id }`,
			checked ? `${ prefix }item-checked` : '',
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
			className={ `${ prefix }item-input` }
			checked={ checked }
			{ ...restOption }
		/>

		<Label
			className={ `${ prefix }item-label` }
			htmlFor={ id }
			sx={ labelStyle( variant ) }
			{ ...labelProps }
		>
			{ label }
		</Label>
	</Box>
);

type RadioProps = {
	variant?: string;
	disabled?: boolean;
	defaultValue?: string | number;
	onChange: ( e: React.ChangeEvent< HTMLInputElement >, option: object ) => void;
	name?: string;
	options?: object[];
	className?: string;
};

const Radio = React.forwardRef(
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
		forwardRef
	) => {
		// If disabled is pass globally, it will overwrite the variant
		if ( disabled === true || disabled === undefined ) {
			variant = 'disabled';
		}

		const onChangeHandler = useCallback( e => {
			const optionTriggered = options.find(
				option => `${ option.value }` === `${ e.target.value }`
			);
			onChange( e, optionTriggered );
		}, [] );

		const renderedOptions = options.map( option => (
			<RadioOption
				variant={ option?.disabled === true ? 'disabled' : variant }
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
				ref={ forwardRef }
				className={ classNames( prefix, `${ prefix }${ name }`, className ) }
				{ ...props }
			>
				{ renderedOptions }
			</div>
		);
	}
);

Radio.displayName = 'Radio';

Radio.propTypes = {
	className: PropTypes.any,
	defaultValue: PropTypes.any,
	disabled: PropTypes.bool,
	name: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.any,
};

export { Radio };
