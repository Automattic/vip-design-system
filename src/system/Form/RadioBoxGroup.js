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

const ChipOption = ( {
	defaultValue,
	option: { id, value, label },
	name,
	disabled,
	onChangeHandler,
} ) => {
	const checked = `${ defaultValue }` === `${ value }`;
	const forLabel = id || value;
	const ref = React.useRef( null );
	const describedById = `input-radio-box-${ forLabel }-description`;

	return (
		<div
			id={ `o${ forLabel }` }
			onClick={ () => {
				ref.current?.click();
			} }
			sx={ {
				display: 'inline-flex',
				position: 'relative',
				background: checked ? 'layer.4' : undefined,
				color: 'text',
				minHeight: '32px',
				boxShadow: checked ? 'low' : undefined,
				'&:hover': {
					background: checked ? 'layer.4' : 'layer.1',
				},
				borderRadius: 1,
			} }
		>
			<input
				ref={ ref }
				type="radio"
				id={ forLabel }
				disabled={ disabled }
				name={ name }
				checked={ checked }
				aria-checked={ checked }
				value={ value }
				onChange={ onChangeHandler }
				aria-labelledby={ describedById }
				sx={ {
					opacity: 0,
					height: 0,
					width: 0,
					position: 'absolute',
					'&:focus-visible + label': theme => theme.outline,
				} }
			/>

			<label
				id={ describedById }
				htmlFor={ forLabel }
				sx={ {
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					width: '100%',
					px: 3,
					fontWeight: 400,
					fontSize: 2,
					cursor: 'pointer',
					borderRadius: 1,
				} }
			>
				{ label }
			</label>
		</div>
	);
};

ChipOption.propTypes = RadioOption.propTypes = {
	defaultValue: PropTypes.string,
	option: PropTypes.object,
	name: PropTypes.string,
	onChangeHandler: PropTypes.func,
	disabled: PropTypes.bool,
	width: PropTypes.string,
};

const groupStyleOverrides = {
	chip: {
		background: 'layer.3',
		p: 1,
		display: 'inline-flex',
		gap: 1,
		borderRadius: 1,
	},
	primary: {
		display: 'inline-block',
		mb: 2,
		p: 0,
	},
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
			variant = 'primary',
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

		let Option = RadioOption;
		if ( variant === 'chip' ) {
			Option = ChipOption;
		}

		const renderedOptions = options.map( option => (
			<Option
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
						...groupStyleOverrides[ variant ],
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
							gap: variant === 'chip' ? 1 : 2,
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
	variant: PropTypes.oneOf( [ 'primary', 'chip' ] ),
};

export { RadioBoxGroup };
