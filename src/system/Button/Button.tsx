import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Theme, Button as ThemeButton, ButtonProps as ThemeButtonProps } from 'theme-ui';

type PolymorphicProps< E extends React.ElementType, OwnProps > = OwnProps & { as?: E } & Omit<
		React.ComponentPropsWithRef< E >,
		keyof OwnProps | 'as'
	>;

type PolymorphicRef< E extends React.ElementType > = React.ComponentPropsWithRef< E >[ 'ref' ];

type ButtonStyleProps = Omit<
	ThemeButtonProps,
	keyof React.ComponentPropsWithRef< 'button' > | 'as' | 'variant'
>;

type ButtonClickHandler< E extends React.ElementType > =
	'onClick' extends keyof React.ComponentPropsWithRef< E >
		? React.ComponentPropsWithRef< E >[ 'onClick' ]
		: never;

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

export type ButtonOwnProps< E extends React.ElementType = 'button' > = ButtonStyleProps &
	React.AriaAttributes & {
		/** The content displayed inside the button. */
		children?: React.ReactNode;
		/** Additional CSS class names. */
		className?: string;
		/** Whether the button is disabled. */
		disabled?: boolean;
		/** Uses `aria-disabled` instead of the native `disabled` attribute, keeping the button focusable. */
		preferAriaDisabled?: boolean;
		/** Click event handler. */
		onClick?: ButtonClickHandler< E >;
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
	};

export type ButtonProps< E extends React.ElementType = 'button' > = PolymorphicProps<
	E,
	ButtonOwnProps< E >
>;

type ButtonComponent = {
	< E extends React.ElementType = 'button' >(
		props: ButtonProps< E > & { ref?: PolymorphicRef< E > }
	): React.ReactElement | null;
	displayName?: string;
};

type ThemeButtonRenderProps = ThemeButtonProps & {
	'data-danger'?: boolean;
	ref?: React.Ref< unknown >;
};

const ThemeButtonComponent = ThemeButton as React.ElementType< ThemeButtonRenderProps >;

/**
 * A versatile button component with multiple style variants, danger state, and accessible disabled support.
 */
const Button = ( < E extends React.ElementType = 'button' >( {
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
}: ButtonProps< E > & { ref?: PolymorphicRef< E > } ) => {
	const disabledAttributes =
		disabled && preferAriaDisabled === true ? { 'aria-disabled': true } : { disabled };
	let disabledStyles = {};

	const handleOnClick = useCallback< React.MouseEventHandler< globalThis.Element > >(
		event => {
			if ( preferAriaDisabled && disabled ) {
				return event.preventDefault();
			}

			const onClickHandler = onClick as React.MouseEventHandler< globalThis.Element > | undefined;

			if ( onClickHandler ) {
				return onClickHandler( event );
			}
		},
		[ disabled, onClick, preferAriaDisabled ]
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

	const themeButtonProps = {
		sx: {
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
		},
		...rest,
		...disabledAttributes,
		variant: variant === 'danger' ? 'primary' : variant, // fallback for danger variant used before the prop was added
		onClick: handleOnClick,
		className: classNames( 'vip-button-component', className ),
		'data-danger': danger,
		ref,
	} as ThemeButtonRenderProps;

	return <ThemeButtonComponent { ...themeButtonProps } />;
} ) as ButtonComponent;

Button.displayName = 'Button';

export { Button };
