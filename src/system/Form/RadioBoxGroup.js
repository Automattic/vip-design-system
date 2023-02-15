/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ScreenReaderText from '../ScreenReaderText';
import { Label } from './Label';

/**
 * Internal dependencies
 */

const RadioOption = ( {
	width,
	disabled,
	defaultValue,
	option: { id, value, className, label, description, labelProps = {}, ...restOption },
	name,
	onChangeHandler,
} ) => {
	const forLabel = id || value;
	const checked = `${ defaultValue }` === `${ value }`;
	const ref = React.useRef( null );
	return (
		<div
			id={ `o${ forLabel }` }
			sx={ {
				width,
				display: 'flex',
				flexDirection: 'row-reverse',
				alignItems: 'flex-start',
				backgroundColor: 'input.radio-box.background.default',
				cursor: 'pointer',
				borderRadius: 2,
				textAlign: 'left',
				border: '1px solid',
				borderColor: 'input.radio-box.border.default',
				position: 'relative',
				'&:hover': {
					backgroundColor: 'input.radio-box.background.hover',
					borderColor: 'input.radio-box.border.default',
				},
				...( checked && {
					borderColor: 'input.radio-box.border.active',
				} ),
				...( disabled && {
					borderColor: 'input.radio-box.border.disabled',
				} ),
			} }
			onClick={ () => {
				ref.current?.click();
			} }
		>
			<input
				ref={ ref }
				checked={ checked }
				type="radio"
				name={ name }
				id={ forLabel }
				onChange={ onChangeHandler }
				value={ `${ value }` }
				sx={ { mr: 3, mt: 3 } }
				{ ...restOption }
			/>
			<div
				sx={ { mb: 0, color: 'input.radio-box.label.primary.default', p: 3, pr: 0, flex: 'auto' } }
			>
				<label htmlFor={ forLabel } { ...labelProps }>
					{ label }
				</label>
				{ description && (
					<span
						sx={ {
							color: 'input.radio-box.label.secondary.default',
							mb: 0,
							fontSize: 1,
							display: 'block',
						} }
					>
						{ description }
					</span>
				) }
			</div>
		</div>
	);
};

RadioOption.propTypes = {
	defaultValue: PropTypes.string,
	option: PropTypes.object,
	name: PropTypes.string,
	onChangeHandler: PropTypes.func,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	width: PropTypes.string,
};

const RadioBoxGroup = React.forwardRef(
	(
		{
			optionWidth = 'auto',
			name = '',
			onChange,
			groupLabel,
			defaultValue,
			options,
			disabled,
			...props
		},
		forwardRef
	) => {
		const onChangeHandler = useCallback(
			e => {
				const optionTriggered = options.find(
					option => `${ option.value }` === `${ e.target.value }`
				);
				onChange( e, optionTriggered );
			},
			[ onChange ]
		);

		const renderedOptions = options.map( option => (
			<RadioOption
				defaultValue={ defaultValue }
				disabled={ disabled }
				key={ option?.id || option?.value }
				name={ name }
				option={ option }
				onChangeHandler={ onChangeHandler }
				width={ optionWidth }
			/>
		) );

		return (
			<fieldset
				sx={ {
					border: 0,
					padding: 0,
				} }
				ref={ forwardRef }
				{ ...props }
			>
				{ groupLabel ? (
					<Label as="legend" sx={ { mb: 2 } }>
						{ groupLabel }
					</Label>
				) : (
					<ScreenReaderText>Choose an option</ScreenReaderText>
				) }
				<div
					sx={ {
						display: 'flex',
						gap: 2,
					} }
				>
					{ renderedOptions }
				</div>
			</fieldset>
		);
	}
);

RadioBoxGroup.displayName = 'RadioBoxGroup';

RadioBoxGroup.propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.array,
	defaultValue: PropTypes.string,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	groupLabel: PropTypes.string,
	optionWidth: PropTypes.string,
};

export { RadioBoxGroup };
