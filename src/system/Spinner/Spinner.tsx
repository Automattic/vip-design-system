/**
 * External dependencies
 */
import classNames from 'classnames';
import { Ref } from 'react';
import { Spinner as ThemeSpinner, SpinnerProps, ThemeUIStyleObject } from 'theme-ui';

export interface ThemeSpinnerProps extends SpinnerProps {
	/** Additional Theme UI styles applied to the spinner. */
	sx?: ThemeUIStyleObject;
	/** Additional CSS class name. */
	className?: string;
	/**
	 * The color of the spinner stroke.
	 * @default 'icon.helper'
	 */
	color?: string;
	/**
	 * The width of the spinner's SVG stroke.
	 * @default 2
	 */
	strokeWidth?: number;
	/** Forwarded ref to the underlying SVG element. */
	ref?: Ref< SVGSVGElement >;
}

/**
 * An animated SVG spinner used to indicate a loading state.
 */
export const Spinner = ( {
	sx,
	color = 'icon.helper',
	strokeWidth = 2,
	className,
	ref,
	...props
}: ThemeSpinnerProps ) => (
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
);

Spinner.displayName = 'Spinner';
