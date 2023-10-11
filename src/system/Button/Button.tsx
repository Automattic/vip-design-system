/**
 * External dependencies
 */
import React, { useCallback, forwardRef, Ref } from 'react';
import { Theme, Button as ThemeButton, ButtonProps as ThemeButtonProps } from 'theme-ui';
import classNames from 'classnames';

type ButtonClickType = React.MouseEvent< HTMLButtonElement, MouseEvent >;

interface ButtonTheme extends Theme {
	outline?: Record< string, string >;
}

export interface ButtonProps extends ThemeButtonProps {
	disabled?: boolean;
	onClick?: ( event: ButtonClickType ) => void;
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
					verticalAlign: 'middle',
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '36px',
					py: 0,
					textDecoration: 'none',
					'&:hover': {
						textDecoration: 'none',
					},
					'&:focus-visible': ( theme: ButtonTheme ) => theme.outline,
					'&[aria-disabled="true"]': {
						opacity: 0.7,
						cursor: 'not-allowed',
						pointerEvents: 'all',
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
