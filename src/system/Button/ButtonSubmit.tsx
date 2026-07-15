/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

import { Button, ButtonProps } from './Button';
import { Spinner } from '../Spinner';

interface DefaultSpinnerProps {
	color?: string;
	size: number;
}

function DefaultSpinner( { size, color = 'link' }: DefaultSpinnerProps ) {
	return <Spinner size={ size } sx={ { ml: 2, color } } className="vip-button-submit-spinner" />;
}

DefaultSpinner.displayName = 'DefaultSpinner';

export interface ButtonSubmitProps extends ButtonProps {
	/** The content displayed inside the button. */
	label: React.ReactNode;
	/**
	 * Whether the button is in a loading state, showing a spinner.
	 * @default false
	 */
	loading?: boolean;
	/**
	 * Custom loading icon component rendered when `loading` is true.
	 * @default DefaultSpinner
	 */
	loadingIcon?: ( props: DefaultSpinnerProps ) => React.JSX.Element;
	/**
	 * Size (in pixels) of the loading icon.
	 * @default 20
	 */
	loadingIconSize?: number;
	/**
	 * Controls whether the button is rendered.
	 * @default true
	 */
	show?: boolean;
}

/**
 * A button designed for form submissions with built-in loading state and spinner indicator.
 */
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
				preferAriaDisabled={ true }
				variant={ variant }
				aria-busy={ loading }
				{ ...rest }
			>
				{ label }{ ' ' }
				{ Boolean( loading ) &&
					loadingIcon( { size: loadingIconSize, color: `button.${ variant }.label.default` } ) }
			</Button>
		);
	}
);

ButtonSubmit.displayName = 'ButtonSubmit';
