/**
 * External dependencies
 */
import React from 'react';
import { Button, ButtonProps } from './Button';
import { Spinner } from '../Spinner';
import classNames from 'classnames';

interface DefaultSpinnerProps {
	color?: string;
	size: number;
}

function DefaultSpinner( { size, color = 'link' }: DefaultSpinnerProps ) {
	return <Spinner size={ size } sx={ { ml: 2, color } } className="vip-button-submit-spinner" />;
}

DefaultSpinner.displayName = 'DefaultSpinner';

export interface ButtonSubmitProps extends ButtonProps {
	label: React.ReactNode;
	loading?: boolean;
	loadingIcon?: ( props: DefaultSpinnerProps ) => JSX.Element;
	loadingIconSize?: number;
	show?: boolean;
}

export const ButtonSubmit = React.forwardRef< HTMLButtonElement, ButtonSubmitProps >(
	(
		{
			show = true,
			variant = 'secondary',
			label,
			loading = false,
			disabled = false,
			loadingIcon = DefaultSpinner,
			loadingIconSize = 20,
			...rest
		}: ButtonSubmitProps,
		ref: React.Ref< HTMLButtonElement >
	) => {
		if ( ! show ) {
			return null;
		}

		return (
			<Button
				ref={ ref }
				className={ classNames( 'vip-button-submit-component', `vip-button-submit-${ variant }` ) }
				disabled={ disabled || loading }
				variant={ variant }
				aria-busy={ loading }
				{ ...rest }
			>
				{ label }{ ' ' }
				{ !! loading &&
					loadingIcon( { size: loadingIconSize, color: `button.${ variant }.label.default` } ) }
			</Button>
		);
	}
);

ButtonSubmit.displayName = 'ButtonSubmit';
