/* eslint-disable max-len */
/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Box } from 'theme-ui';

import { baseControlBorderStyle, inputBaseText } from './Input.styles';
import { Label } from './Label';
import { screenReaderTextClass } from '../ScreenReaderText/ScreenReaderText';
import mainTheme from '../theme';

const prefix = 'vip-radio-component-';

const itemStyle = {
	display: 'flex',
	alignItems: 'center',
	my: 2,
};

const radioPosition = mainTheme.space[ 5 ];

// The output willl be 16px because of the 1px border.
const RADIO_SIZE = '14px';

const inputStyle = {
	...screenReaderTextClass,
	width: RADIO_SIZE,
	height: RADIO_SIZE,
	'&:focus ~ label:before': theme => ( {
		...theme.outline,
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
		left: `${ -1 * radioPosition }px`,
	} ),
	'&:checked ~ label::after': {
		opacity: 1,
	},
};

const labelStyle = {
	cursor: 'pointer',
	position: 'relative',
	marginLeft: `${ radioPosition }px`,
	marginBottom: 0,
	userSelect: 'none',
	color: inputBaseText,
	lineHeight: 'body',
	'&:before, &:after': {
		borderRadius: '100%',
		position: 'absolute',
		top: 1,
		left: `${ -1 * radioPosition }px`,
		transition: 'all .3s ease-out',
		width: RADIO_SIZE,
		height: RADIO_SIZE,
	},
	'&::before': {
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
	},
	'&::after': {
		content: '""',
		backgroundSize: '100%',
		backgroundRepeat: 'no-repeat',
		backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.25' fill='%23fff'/%3E%3C/svg%3E")`,
		border: '1px solid',
		color: 'white',
		opacity: 0,
	},
};

const CustomLabel = ( { children, ...restLabel } ) => {
	return (
		<>
			{ React.cloneElement( React.Children.only( children ), {
				...children.props,
				sx: { ...labelStyle, ...children.props.sx },
				className: `${ children.props.className } ${ prefix }item-label`,
				...restLabel,
			} ) }
		</>
	);
};

CustomLabel.propTypes = {
	children: PropTypes.any,
};

const RadioOption = ( {
	option: { id, value, disabled: ignoreDisabled, className, label, labelProps = {}, ...restOption },
	name,
	variant,
	disabled,
	onChangeHandler,
	checked,
} ) => (
	<Box
		as="div"
		sx={ {
			variant: `radio.${ variant }`,
			...itemStyle,
		} }
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
			sx={ inputStyle }
			onChange={ onChangeHandler }
			className={ `${ prefix }item-input` }
			checked={ checked }
			{ ...restOption }
		/>

		{ typeof label === 'string' ? (
			<Label
				className={ `${ prefix }item-label` }
				htmlFor={ id }
				sx={ labelStyle }
				{ ...labelProps }
			>
				{ label }
			</Label>
		) : (
			<CustomLabel { ...labelProps }>{ label }</CustomLabel>
		) }
	</Box>
);

RadioOption.propTypes = {
	option: PropTypes.object,
	name: PropTypes.string,
	onChangeHandler: PropTypes.func,
	checked: PropTypes.bool,
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
		},
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
				className={ classNames( prefix, `${ prefix }${ name }`, className ) }
				ref={ forwardRef }
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
