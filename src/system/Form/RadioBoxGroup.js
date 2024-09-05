/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { RequiredLabel } from './RequiredLabel';
import { Validation } from './Validation';
import ScreenReaderText from '../ScreenReaderText';

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
	const describedById = `input-radio-box-${ forLabel }-description`;

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
				minWidth: 220,
				flexGrow: 1,
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
				sx={ { mr: 5, mt: 3 } }
				aria-describedby={ describedById }
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
						id={ describedById }
					>
						{ description }
					</span>
				) }
			</div>
		</div>
	);
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
			errorMessage,
			hasError,
			required,
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
			<div>
				<fieldset
					sx={ {
						border: 0,
						display: 'inline-block',
						mb: 2,
						p: 0,
						...( hasError
							? { border: '1px solid', borderColor: 'input.border.error', borderRadius: 2, p: 2 }
							: {} ),
					} }
					ref={ forwardRef }
					aria-required={ required }
					role="radiogroup"
					{ ...props }
				>
					{ groupLabel ? (
						<legend sx={ { mb: 2 } }>
							{ groupLabel }
							{ required ? <RequiredLabel /> : null }
						</legend>
					) : (
						<ScreenReaderText>Choose an option</ScreenReaderText>
					) }
					<div
						sx={ {
							display: 'flex',
							flexWrap: 'wrap',
							gap: 2,
						} }
					>
						{ renderedOptions }
					</div>
				</fieldset>

				{ hasError && errorMessage && (
					<Validation isValid={ false } describedId={ groupLabel }>
						{ errorMessage }
					</Validation>
				) }
			</div>
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
	id: PropTypes.string,
	optionWidth: PropTypes.string,
	errorMessage: PropTypes.string,
	hasError: PropTypes.bool,
	required: PropTypes.bool,
};

export { RadioBoxGroup };
