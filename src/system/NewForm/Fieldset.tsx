/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlBorderStyle, inputBaseBackground, inputBaseText } from '../Form/Input.styles';

interface FieldsetProps {
	children?: React.ReactNode;
	sx?: ThemeUIStyleObject;
	className?: string;
}
export const Fieldset = React.forwardRef< HTMLFieldSetElement, FieldsetProps >(
	( { children, className, sx = {}, ...props }, forwardRef ) => (
		<fieldset
			ref={ forwardRef }
			className={ classNames( 'vip-form-fieldset-component', className ) }
			sx={ {
				all: 'unset',
				...baseControlBorderStyle,
				backgroundColor: inputBaseBackground,
				color: inputBaseText,
				borderRadius: 1,
				display: 'block',
				pt: 1,
				pb: 2,
				px: 3,
				mb: 3,
				...sx,
			} }
			{ ...props }
		>
			{ children }
		</fieldset>
	)
);

Fieldset.displayName = 'Fieldset';
