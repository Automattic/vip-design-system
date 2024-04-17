/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { useCallback, forwardRef, Ref } from 'react';
import { Theme, Button as ThemeButton, ButtonProps as ThemeButtonProps } from 'theme-ui';

type ButtonClickType = React.MouseEvent< HTMLButtonElement, MouseEvent >;

interface ButtonTheme extends Theme {
	outline?: Record< string, string >;
}

export enum ButtonVariant {
	'danger',
	'display',
	'ghost',
	'icon',
	'primary',
	'secondary',
	'tertiary',
	'text',
}

export interface ButtonProps extends ThemeButtonProps {
	disabled?: boolean;
	onClick?: ( event: ButtonClickType ) => void;
	variant?: keyof typeof ButtonVariant; // converts the enum to a string union type
}

const Button = forwardRef< HTMLButtonElement, ButtonProps >(
	( { className, disabled, onClick, sx, ...rest }: ButtonProps, ref: Ref< HTMLButtonElement > ) => {
		const handleOnClick = useCallback(
			( event: ButtonClickType ) => {
				if ( disabled ) {
					return event.preventDefault();
				}

				if ( onClick ) {
					return onClick( event );
				}
			},
			[ disabled, onClick ]
		);

		return (
			<ThemeButton
				sx={ {
					'&:focus': 'none',
					'&:focus-visible': ( theme: ButtonTheme ) => theme.outline,
					'&[aria-disabled="true"]': {
						opacity: 0.7,
						backgroundColor: 'input.border.disabled',
						color: 'texts.secondary',
						cursor: 'not-allowed',
						pointerEvents: 'none',
					},
					...sx,
				} }
				{ ...rest }
				aria-disabled={ disabled }
				onClick={ handleOnClick }
				className={ classNames( 'vip-button-component', className ) }
				ref={ ref }
			/>
		);
	}
);

Button.displayName = 'Button';

export { Button };
