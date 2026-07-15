/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { ReactNode, useCallback } from 'react';

import { RequiredLabel } from './RequiredLabel';
import { Validation } from './Validation';
import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

export interface RadioBoxOption extends React.InputHTMLAttributes< HTMLInputElement > {
	/** The visible label for the option. */
	label?: ReactNode;
	/** Optional descriptive text shown below the label. */
	description?: ReactNode;
	/** Additional props forwarded to the `<label>` element. */
	labelProps?: React.LabelHTMLAttributes< HTMLLabelElement >;
}

interface RadioOptionProps {
	width?: string | number;
	disabled?: boolean;
	defaultValue?: string | number;
	option: RadioBoxOption;
	name?: string;
	onChangeHandler?: React.ChangeEventHandler< HTMLInputElement >;
}

const RadioOption = ( {
	width,
	disabled,
	defaultValue,
	option: { id, value, className, label, description, labelProps = {}, ...restOption },
	name,
	onChangeHandler,
}: RadioOptionProps ) => {
	const forLabel = id || String( value );
	const checked = String( defaultValue ) === String( value );
	const ref = React.useRef< HTMLInputElement >( null );
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
				value={ String( value ) }
				sx={ { mr: 5, mt: 3 } }
				aria-describedby={ describedById }
				{ ...restOption }
			/>
			<div
				sx={ {
					mb: 0,
					color: 'input.radio-box.label.primary.default',
					fontWeight: 'semibold',
					p: 3,
					pr: 0,
					flex: 'auto',
				} }
			>
				<label htmlFor={ forLabel } { ...labelProps }>
					{ label }
				</label>
				{ description && (
					<span
						sx={ {
							color: 'input.radio-box.label.secondary.default',
							mb: 0,
							mt: 1,
							fontSize: 1,
							fontWeight: 'regular',
							letterSpacing: '0.01em',
							lineHeight: '140%',
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

export interface RadioBoxGroupProps
	extends Omit< React.FieldsetHTMLAttributes< HTMLFieldSetElement >, 'onChange' > {
	/**
	 * Width applied to each option.
	 * @default 'auto'
	 */
	optionWidth?: string | number;
	/** The `name` shared by the radio inputs. */
	name?: string;
	/** Callback invoked when the selection changes; receives the event and the matched option. */
	onChange?: ( e: React.ChangeEvent< HTMLInputElement >, option?: RadioBoxOption ) => void;
	/** Accessible label for the group, rendered in a legend. */
	groupLabel?: ReactNode;
	/** The value of the option selected by default. */
	defaultValue?: string | number;
	/** The list of options to render. */
	options: RadioBoxOption[];
	/** Whether all options are disabled. */
	disabled?: boolean;
	/** Validation message shown when `hasError` is true. */
	errorMessage?: ReactNode;
	/** Whether the group is in an error state. */
	hasError?: boolean;
	/** Whether a selection is required. */
	required?: boolean;
}

const RadioBoxGroup = React.forwardRef< HTMLFieldSetElement, RadioBoxGroupProps >(
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
			( e: React.ChangeEvent< HTMLInputElement > ) => {
				const optionTriggered = options.find( option => String( option.value ) === e.target.value );
				onChange?.( e, optionTriggered );
			},
			[ onChange ]
		);

		const renderedOptions = options.map( option => (
			<RadioOption
				defaultValue={ defaultValue }
				disabled={ disabled }
				key={ option?.id || String( option?.value ) }
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
					<Validation
						isValid={ false }
						describedId={ typeof groupLabel === 'string' ? groupLabel : undefined }
					>
						{ errorMessage }
					</Validation>
				) }
			</div>
		);
	}
);

RadioBoxGroup.displayName = 'RadioBoxGroup';

export { RadioBoxGroup };
