/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';

import { Button, ButtonLoadingIconProps, ButtonProps } from './Button';

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
	 * @default DefaultButtonLoadingIcon
	 */
	loadingIcon?: ( props: ButtonLoadingIconProps ) => React.JSX.Element;
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
export const ButtonSubmit = ( {
	show = true,
	variant = 'secondary',
	label,
	loading = false,
	disabled = false,
	loadingIcon,
	loadingIconSize = 20,
	ref,
	...rest
}: ButtonSubmitProps ) => {
	if ( ! show ) {
		return null;
	}

	return (
		<Button
			ref={ ref }
			className={ classNames( 'vip-button-submit-component', `vip-button-submit-${ variant }` ) }
			disabled={ disabled }
			preferAriaDisabled={ true }
			variant={ variant }
			loading={ loading }
			loadingIcon={ loadingIcon }
			loadingIconSize={ loadingIconSize }
			{ ...rest }
		>
			{ label }
		</Button>
	);
};

ButtonSubmit.displayName = 'ButtonSubmit';
