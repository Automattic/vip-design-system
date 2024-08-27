/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useCallback } from 'react';
import { Theme } from 'theme-ui';

import { RequiredLabel } from './RequiredLabel';
import { Validation } from './Validation';
import ScreenReaderText from '../ScreenReaderText';

/**
 * Internal dependencies
 */

interface InputTheme extends Theme {
	outline?: Record< string, string >;
}

type Option = {
	id?: string;
	value: string;
	label: React.ReactNode | string;
};

type ChipOptionProps = {
	defaultValue?: string;
	option: Option;
	name: string;
	disabled?: boolean;
	onChangeHandler: ( e: React.ChangeEvent< HTMLInputElement > ) => void;
	size: 'small' | 'medium';
};

const ChipOption = ( {
	defaultValue,
	option: { id, value, label },
	name,
	disabled,
	onChangeHandler,
	size = 'medium',
}: ChipOptionProps ) => {
	const checked = `${ defaultValue }` === `${ value }`;
	const forLabel = id || value;
	const ref = React.useRef( null );
	const describedById = `input-radio-box-${ forLabel }-description`;

	return (
		<div
			id={ `o${ forLabel }` }
			onClick={ () => {
				if ( ref.current ) {
					( ref.current as HTMLInputElement ).click();
				}
			} }
			sx={ {
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
				value={ value }
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

type RadioGroupChipProps = {
	optionWidth?: string;
	name?: string;
	onChange: ( e: React.ChangeEvent< HTMLInputElement >, option?: Option ) => void;
	groupLabel?: string;
	defaultValue?: string;
	options: Option[];
	disabled?: boolean;
	errorMessage?: string;
	hasError?: boolean;
	required?: boolean;
	size?: 'small' | 'medium';
};

const RadioGroupChip = React.forwardRef(
	(
		{
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
			...props
		}: RadioGroupChipProps,
		forwardRef
	) => {
		const onChangeHandler = useCallback(
			( e: React.ChangeEvent< HTMLInputElement > ) => {
				const optionTriggered = options.find(
					option => `${ option.value }` === `${ e.target.value }`
				);
				onChange( e, optionTriggered );
			},
			[ onChange ]
		);

		const renderedOptions = options.map( option => (
			<ChipOption
				defaultValue={ defaultValue }
				disabled={ disabled }
				key={ option?.id || option?.value }
				name={ name }
				option={ option }
				onChangeHandler={ onChangeHandler }
				size={ size }
			/>
		) );

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
					} }
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
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
							gap: 1,
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

RadioGroupChip.displayName = 'RadioGroupChip';

export { RadioGroupChip };
