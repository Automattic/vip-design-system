/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { ReactNode, useRef } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { Input as ThemeInput, ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlStyle } from './Input.styles';
import { Label } from './Label';
import { Validation } from './Validation';
import { Button } from '../Button/Button';

export interface InputWithCopyButtonProps extends React.InputHTMLAttributes< HTMLInputElement > {
	/** Visual variant (excluded from the props forwarded to the input). */
	variant?: string;
	/** Label rendered above the input. */
	label?: ReactNode;
	/** `htmlFor`/`id` value tying the label to the input. */
	forLabel?: string;
	/**
	 * Whether the field is in an error state.
	 * @default false
	 */
	hasError?: boolean;
	/** Whether the field is required. */
	required?: boolean;
	/** Theme UI style overrides applied to the input. */
	sx?: ThemeUIStyleObject;
	/** Validation message shown when `hasError` is true. */
	errorMessage?: ReactNode;
	/** Callback invoked with the copied value after a successful copy. */
	copyHandler?: ( value?: string ) => void;
	/** Ref forwarded to the underlying input element. */
	ref?: React.Ref< HTMLInputElement >;
}

const inputStyles: ThemeUIStyleObject = {
	unset: 'all',
	...baseControlStyle,
	lineHeight: 'inherit',
	minHeight: '36px',
	px: 3,
	py: 2,
	fontSize: 2,
	mb: 2,
	variant: 'inputs.default',
};

const InputWithCopyButton = ( {
	variant,
	label,
	forLabel,
	hasError = false,
	required,
	sx = {},
	errorMessage,
	copyHandler,
	ref,
	...props
}: InputWithCopyButtonProps ) => {
	const fallbackRef = useRef< HTMLInputElement >( null );
	const inputRef = (
		ref && typeof ref !== 'function' ? ref : fallbackRef
	) as React.RefObject< HTMLInputElement >;

	const handleCopy = ( e: React.MouseEvent< HTMLButtonElement > ) => {
		e.preventDefault();
		const clipboard = navigator.clipboard; // eslint-disable-line no-undef
		const value = inputRef.current?.value ?? '';
		void clipboard.writeText( value );
		if ( copyHandler ) {
			copyHandler( value );
		}
	};
	return (
		<React.Fragment>
			{ label && (
				<Label required={ required } htmlFor={ forLabel }>
					{ label }
				</Label>
			) }
			<div sx={ { display: 'flex' } }>
				<ThemeInput
					ref={ inputRef }
					id={ forLabel }
					required={ required }
					aria-required={ required }
					aria-describedby={ hasError ? `describe-${ forLabel }-validation` : undefined }
					sx={ {
						...inputStyles,
						...sx,
						...( hasError ? { borderColor: 'input.border.error' } : {} ),
					} }
					{ ...props }
				/>
				<div sx={ { ml: 2 } }>
					<Button
						sx={ { height: '40px' } }
						aria-label={ `Copy ${ String( label ) }` }
						onClick={ handleCopy }
						variant="ghost"
					>
						<MdContentCopy sx={ { mr: 2 } } />
						Copy
					</Button>
				</div>
			</div>
			{ hasError && errorMessage && (
				<Validation isValid={ false } describedId={ forLabel }>
					{ errorMessage }
				</Validation>
			) }
		</React.Fragment>
	);
};

InputWithCopyButton.displayName = 'InputWithCopyButton';

export { InputWithCopyButton };
