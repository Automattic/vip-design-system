/* eslint-disable max-len */
/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Label } from './Label';
import { screenReaderTextClass } from '../ScreenReaderText/ScreenReaderText';
import mainTheme from '../theme';
import { baseControlBorderStyle, inputBaseText } from './Input.styles';

const prefix = 'vip-radio-component-';

const itemStyle = {
	display: 'flex',
	alignItems: 'center',
	my: 2,
};

const radioPosition = mainTheme.space[ 4 ] - mainTheme.space[ 1 ];

const inputStyle = {
	...screenReaderTextClass,
	width: '16px',
	height: '16px',
	'&:focus ~ label:before': theme => ( {
		...theme.outline,
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
		zIndex: 3,
		left: `${ -1 * radioPosition }px`,
	} ),
	'&:checked ~ label::after': {
		opacity: 1,
		transform: 'scale(1)',
	},
};

const labelStyle = {
	cursor: 'pointer',
	position: 'relative',
	marginLeft: `${ radioPosition }px`,
	marginBottom: 0,
	userSelect: 'none',
	color: inputBaseText,
	lineHeight: 1.5,
	'&:before, &:after': {
		borderRadius: '50%',
		position: 'absolute',
		top: 0,
		left: `${ -1 * radioPosition }px`,
		transition: 'all .3s ease-out',
		zIndex: 2,
		width: '16px',
		height: '16px',
	},
	'&::before': {
		content: '""',
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
	},
	'&::after': {
		content: '""',
		backgroundColor: 'link',
		backgroundPosition: 'left 2px top 2px',
		backgroundSize: '70%',
		backgroundRepeat: 'no-repeat',

		backgroundImage: `url(
					'data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4999 4.9995L5.7254 12.4008L2.5 9.33023L3.83307 7.92994L5.7254 9.73144L12.1668 3.59921L13.4999 4.9995Z" fill="white"/></svg>')`,
		border: '1px solid',
		borderColor: baseControlBorderStyle.borderColor,
		color: 'white',
		transform: 'scale(0)',
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
	option: { id, value, className, label, labelProps = {}, ...restOption },
	name,
	onChangeHandler,
	checked,
} ) => (
	<div
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
	</div>
);

RadioOption.propTypes = {
	option: PropTypes.object,
	name: PropTypes.string,
	onChangeHandler: PropTypes.func,
	checked: PropTypes.bool,
};

const Radio = React.forwardRef(
	(
		{ disabled, defaultValue, onChange, name = '', options = [], className, ...props },
		forwardRef
	) => {
		const onChangeHandler = useCallback( e => {
			const optionTriggered = options.find(
				option => `${ option.value }` === `${ e.target.value }`
			);
			onChange( e, optionTriggered );
		}, [] );

		const renderedOptions = options.map( option => (
			<RadioOption
				key={ option?.id }
				name={ name }
				option={ option }
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
