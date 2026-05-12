/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
export type FormProps = React.ComponentPropsWithoutRef< 'form' > & {
	/** Content rendered inside the form. */
	children?: React.ReactNode;
	/** Additional CSS class name(s) appended to the root element. */
	className?: string;
};
/** Form wrapper that disables native validation and forwards a ref to the underlying `<form>` element. */
export const Form = React.forwardRef< HTMLFormElement, FormProps >(
	( { children, className, ...props }, forwardRef ) => (
		<form
			ref={ forwardRef }
			className={ classNames( 'vip-form-component', className ) }
			noValidate
			{ ...props }
		>
			{ children }
		</form>
	)
);

Form.displayName = 'Form';
