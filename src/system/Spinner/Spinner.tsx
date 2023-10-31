/**
 * External dependencies
 */
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import { Spinner as ThemeSpinner, SpinnerProps, ThemeUIStyleObject } from 'theme-ui';

export interface ThemeSpinnerProps extends SpinnerProps {
	sx?: ThemeUIStyleObject;
	className?: string;
	color?: string;
	strokeWidth?: number;
}

export const Spinner = forwardRef< SVGSVGElement, ThemeSpinnerProps >(
	(
		{ sx, color = 'icon.helper', strokeWidth = 2, className, ...props }: ThemeSpinnerProps,
		ref: Ref< SVGSVGElement >
	) => (
		<ThemeSpinner
			as="svg"
			sx={ {
				...sx,
				color,
			} }
			strokeWidth={ strokeWidth }
			className={ classNames( 'vip-spinner-component', className ) }
			ref={ ref }
			{ ...props }
		/>
	)
);

Spinner.displayName = 'Spinner';
