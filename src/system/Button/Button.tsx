import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Theme, Button as ThemeButton, ButtonProps as ThemeButtonProps } from 'theme-ui';

type ButtonClickType = React.MouseEvent< HTMLButtonElement, MouseEvent >;

interface ButtonTheme extends Theme {
	outline?: Record< string, string >;
}

export enum ButtonVariant {
	'danger', // will be deprecated in the future
	'display',
	'ghost',
	'icon',
	'primary',
	'secondary',
	'tertiary',
	'text',
}

export interface ButtonProps extends ThemeButtonProps {
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Uses `aria-disabled` instead of the native `disabled` attribute, keeping the button focusable. */
	preferAriaDisabled?: boolean;
	/** Click event handler. */
	onClick?: ( event: ButtonClickType ) => void;
	/** Stretches the button to full width of its container. */
	full?: boolean;
	/** Allows the button to grow within a flex container. */
	grow?: boolean;
	/**
	 * The visual style variant of the button.
	 * @default 'primary'
	 */
	variant?: keyof typeof ButtonVariant; // converts the enum to a string union type
	/** Applies danger/destructive styling to the button. */
	danger?: boolean;
	/** Ref forwarded to the underlying button element. */
	ref?: React.Ref< HTMLButtonElement >;
}

/**
 * A versatile button component with multiple style variants, danger state, and accessible disabled support.
 */
const Button = ( {
	className,
	disabled,
	preferAriaDisabled,
	onClick,
	sx,
	full,
	grow,
	variant = 'primary',
	danger = variant === 'danger', // fallback for danger variant used before the prop was added
	ref,
	...rest
}: ButtonProps ) => {
	const disabledAttributes =
		disabled && preferAriaDisabled === true ? { 'aria-disabled': true } : { disabled };
	let disabledStyles = {};

	const handleOnClick = useCallback(
		( event: ButtonClickType ) => {
			if ( preferAriaDisabled && disabled ) {
				return event.preventDefault();
			}

			if ( onClick ) {
				return onClick( event );
			}
		},
		[ disabled, onClick ]
	);

	if (
		disabled &&
		! danger &&
		variant !== 'text' &&
		variant !== 'ghost' &&
		variant !== 'tertiary'
	) {
		disabledStyles = {
			opacity: 0.7,
			backgroundColor: 'input.border.disabled',
			color: 'texts.secondary',
		};
	}

	return (
		<ThemeButton
			sx={ {
				'&:focus': 'none',
				'&:focus-visible': ( theme: ButtonTheme ) => theme.outline,
				'&[disabled], &[aria-disabled="true"]': {
					cursor: 'not-allowed',
					pointerEvents: 'none',
					...disabledStyles,
				},
				'&:hover, &:focus': {
					textDecoration: 'none',
				},
				flexGrow: Boolean( grow ) === true ? '1' : undefined,
				width: Boolean( full ) === true ? '100%' : undefined,
				...sx,
			} }
			{ ...rest }
			{ ...disabledAttributes }
			variant={ variant === 'danger' ? 'primary' : variant } // fallback for danger variant used before the prop was added
			onClick={ handleOnClick }
			className={ classNames( 'vip-button-component', className ) }
			data-danger={ danger }
			ref={ ref }
		/>
	);
};

Button.displayName = 'Button';

export { Button };
