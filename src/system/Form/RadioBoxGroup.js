/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

const RadioOption = ( {
	disabled,
	defaultValue,
	option: { id, value, className, label, description, labelProps = {}, ...restOption },
	name,
	onChangeHandler,
} ) => {
	const forLabel = id || value;
	return (
		<div
			key={ value }
			value={ value }
			id={ `o${ forLabel }` }
			sx={ {
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
				...( `${ defaultValue }` === `${ value }` && {
					borderColor: 'input.radio-box.border.active',
				} ),
				...( disabled && {
					borderColor: 'input.radio-box.border.disabled',
				} ),
			} }
		>
			<input
				checked={ `${ defaultValue }` === `${ value }` }
				type="radio"
				name={ name }
				id={ forLabel }
				onChange={ onChangeHandler }
				value={ `${ value }` }
				sx={ { mr: 3, mt: 3 } }
				{ ...restOption }
			/>
			<label
				htmlFor={ forLabel }
				sx={ { mb: 0, color: 'input.radio-box.label.primary.default', p: 3, pr: 0 } }
				{ ...labelProps }
			>
				{ label }
				{ description && (
					<>
						<ScreenReaderText>.</ScreenReaderText>
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
					</>
				) }
			</label>
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
};

const RadioBoxGroup = React.forwardRef(
	(
		{ name = '', onChange, groupLabel, defaultValue, options, disabled, ...props },
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
			/>
		) );

		return (
			<fieldset
				sx={ {
					display: 'flex',
					gap: 2,
					border: 0,
					padding: 0,
				} }
				ref={ forwardRef }
				{ ...props }
			>
				{ groupLabel ? (
					<legend>{ groupLabel }</legend>
				) : (
					<ScreenReaderText>Choose an option</ScreenReaderText>
				) }
				{ renderedOptions }
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
};

export { RadioBoxGroup };
