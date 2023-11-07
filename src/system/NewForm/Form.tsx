/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
export interface FormProps {
	children?: React.ReactNode;
	className?: string;
}
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
