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

const inputStyle = {
	...screenReaderTextClass,
	width: '16px',
	height: '16px',
	'&:focus ~ label:before': theme => ( {
		...theme.outline,
		content: '""',
		border: '2px solid',
		borderColor: 'border',
		zIndex: 3,
		left: `${ -1 * ( theme.space[ 4 ] - theme.space[ 2 ] ) }px`,
	} ),
	'&:checked ~ label::after': {
		opacity: 1,
		transform: 'scale(1)',
	},
};

const labelStyle = {
	cursor: 'pointer',
	position: 'relative',
	marginLeft: theme => `${ theme.space[ 4 ] - theme.space[ 2 ] }px`,
	marginBottom: 0,
	userSelect: 'none',
	color: 'heading',
	lineHeight: 1.5,
	'&:before, &:after': {
		borderRadius: '50%',
		position: 'absolute',
		top: 0,
		left: theme => `${ -1 * ( theme.space[ 4 ] - theme.space[ 2 ] ) }px`,
		transition: 'all .3s ease-out',
		zIndex: 2,
		width: '16px',
		height: '16px',
	},
	'&::before': {
		content: '""',
		border: '2px solid',
		borderColor: 'border',
	},
	'&::after': {
		content: '""',
		backgroundColor: 'primary',
		backgroundPosition: 'left 2px top 2px',
		backgroundSize: '70%',
		backgroundRepeat: 'no-repeat',

		backgroundImage: `url(
					'data:image/svg+xml;utf8,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4999 4.9995L5.7254 12.4008L2.5 9.33023L3.83307 7.92994L5.7254 9.73144L12.1668 3.59921L13.4999 4.9995Z" fill="white"/></svg>')`,
		border: '2px solid',
		borderColor: 'border',
		color: 'white',
		transform: 'scale(0)',
		opacity: 0,
	},
};

const CustomLabel = ( { children } ) => {
	return (
		<>
			{ React.cloneElement( React.Children.only( children ), {
				...children.props,
				sx: { ...labelStyle, ...children.props.sx },
				className: `${ children.props.className } vip-radio-component-item-label`,
			} ) }
		</>
	);
};

CustomLabel.propTypes = {
	children: PropTypes.any,
};

const Radio = React.forwardRef(
	(
		{ disabled, defaultValue, onChange, name = '', options = [], className = undefined, ...props },
		forwardRef
	) => {
		const onChangeHandler = useCallback( e => {
			const optionTriggered = options.find(
				option => `${ option.value }` === `${ e.target.value }`
			);
			onChange( e, optionTriggered );
		}, [] );

		const renderedOptions = options.map(
			( { id, className: optionClassName, value, label, labelProps = {}, ...restOption } ) => (
				<div
					sx={ {
						display: 'flex',
						alignItems: 'center',
						minHeight: theme => `${ theme.space[ 4 ] - theme.space[ 2 ] }px`,
					} }
					key={ id }
					className={ classNames( 'vip-radio-component-item', `vip-radio-component-item-${ id }` ) }
				>
					<input
						type="radio"
						id={ id }
						name={ name }
						value={ `${ value }` }
						sx={ inputStyle }
						onChange={ onChangeHandler }
						className={ classNames( 'vip-radio-component-item-input', optionClassName ) }
						checked={ `${ value }` === `${ defaultValue }` }
						{ ...restOption }
					/>

					{ typeof label === 'string' ? (
						<Label
							className={ classNames( 'vip-radio-component-item-label', optionClassName ) }
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
			)
		);

		return (
			<div
				className={ classNames(
					'vip-radio-component',
					`vip-radio-component-${ name }`,
					className
				) }
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
	disabled: PropTypes.bool,
	defaultValue: PropTypes.any,
	onChange: PropTypes.func,
	options: PropTypes.any,
	name: PropTypes.string,
	className: PropTypes.any,
};

export { Radio };
