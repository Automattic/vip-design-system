/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback, useId } from 'react';
import { Theme, ThemeUIStyleObject } from 'theme-ui';

import { RequiredLabel } from './RequiredLabel';
import { Validation } from './Validation';
import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

interface InputTheme extends Theme {
	outline?: Record< string, string >;
}

export type RadioGroupChipOption = {
	id?: string;
	value: string | number;
	label: React.ReactNode;
};

type ChipOptionProps = {
	defaultValue?: string | number;
	option: RadioGroupChipOption;
	name: string;
	disabled?: boolean;
	onChangeHandler?: ( e: React.ChangeEvent< HTMLInputElement > ) => void;
	size: 'small' | 'medium';
	width?: string | number;
};

const ChipOption = ( {
	defaultValue,
	option: { id, value, label },
	name,
	disabled,
	onChangeHandler,
	size = 'medium',
	width,
}: ChipOptionProps ) => {
	const checked = `${ defaultValue }` === `${ value }`;
	const forLabel = id || String( value );
	const ref = React.useRef< HTMLInputElement >( null );
	const describedById = `input-radio-box-${ forLabel }-description`;

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- forwards to the nested native radio <input>, which is keyboard-operable via its associated <label> and focus-visible outline
		<div
			id={ `o${ forLabel }` }
			onClick={ () => {
				if ( ref.current ) {
					ref.current.click();
				}
			} }
			sx={ {
				width,
				display: 'inline-flex',
				position: 'relative',
				background: checked ? 'layer.4' : undefined,
				color: 'text',
				minHeight: size === 'small' ? '22px' : '32px',
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
				value={ String( value ) }
				onChange={ onChangeHandler }
				aria-labelledby={ describedById }
				sx={ {
					opacity: 0,
					height: 0,
					width: 0,
					position: 'absolute',
					'&:focus-visible + label': ( theme: InputTheme ) => theme.outline,
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
					px: size === 'small' ? 1 : 3,
					fontWeight: 400,
					fontSize: size === 'small' ? 1 : 2,
					cursor: 'pointer',
					borderRadius: 1,
				} }
			>
				{ label }
			</label>
		</div>
	);
};

export interface RadioGroupChipProps
	extends Omit< React.FieldsetHTMLAttributes< HTMLFieldSetElement >, 'onChange' > {
	optionWidth?: string | number;
	name?: string;
	onChange?: ( e: React.ChangeEvent< HTMLInputElement >, option?: RadioGroupChipOption ) => void;
	groupLabel?: React.ReactNode;
	defaultValue?: string | number;
	options: RadioGroupChipOption[];
	disabled?: boolean;
	errorMessage?: React.ReactNode;
	hasError?: boolean;
	required?: boolean;
	size?: 'small' | 'medium';
	/** Theme UI style overrides applied to the fieldset. */
	sx?: ThemeUIStyleObject;
	/** Ref forwarded to the underlying fieldset element. */
	ref?: React.Ref< HTMLFieldSetElement >;
}

const RadioGroupChip = ( {
	optionWidth,
	name = '',
	onChange,
	groupLabel,
	defaultValue,
	options,
	disabled,
	errorMessage,
	hasError,
	required,
	size = 'medium',
	sx = {},
	ref,
	'aria-describedby': ariaDescribedBy,
	...props
}: RadioGroupChipProps ) => {
	const generatedValidationId = useId();
	const validationId = props.id ?? generatedValidationId;
	const onChangeHandler = useCallback(
		( e: React.ChangeEvent< HTMLInputElement > ) => {
			const optionTriggered = options.find(
				option => `${ option.value }` === `${ e.target.value }`
			);
			onChange?.( e, optionTriggered );
		},
		[ onChange, options ]
	);

	const renderedOptions = options.map( option => (
		<ChipOption
			defaultValue={ defaultValue }
			disabled={ disabled }
			key={ option?.id || option?.value }
			width={ optionWidth }
			name={ name }
			option={ option }
			onChangeHandler={ onChangeHandler }
			size={ size }
		/>
	) );

	const describedBy =
		[ ariaDescribedBy, hasError && errorMessage ? `describe-${ validationId }-validation` : null ]
			.filter( Boolean )
			.join( ' ' ) || undefined;

	return (
		<div>
			<fieldset
				sx={ {
					border: 0,
					background: 'layer.3',
					p: size === 'small' ? '2px' : 1,
					display: 'inline-flex',
					gap: 1,
					borderRadius: 1,
					...( hasError
						? { border: '1px solid', borderColor: 'input.border.error', borderRadius: 2, p: 2 }
						: {} ),
					...sx,
				} }
				ref={ ref }
				aria-required={ required }
				aria-describedby={ describedBy }
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
						gap: 1,
					} }
				>
					{ renderedOptions }
				</div>
			</fieldset>

			{ hasError && errorMessage && (
				<Validation isValid={ false } describedId={ validationId }>
					{ errorMessage }
				</Validation>
			) }
		</div>
	);
};

RadioGroupChip.displayName = 'RadioGroupChip';

export { RadioGroupChip };
