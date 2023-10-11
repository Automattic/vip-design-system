/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Spinner as ThemeSpinner, SpinnerProps, ThemeUIStyleObject } from 'theme-ui';
import classNames, { Argument } from 'classnames';

export interface ThemeSpinnerProps extends SpinnerProps {
	sx?: ThemeUIStyleObject;
	className?: string;
	color?: string;
	strokeWidth?: number;
}

export const Spinner = forwardRef<SVGSVGElement, ThemeSpinnerProps>(
	({ sx, className, color, ...props }: ThemeSpinnerProps, ref: Ref<SVGSVGElement>) => (
		<ThemeSpinner
			as={'svg'}
			sx={{
				color: 'icon.helper',
			}}
			strokeWidth={2}
			className={classNames('vip-spinner-component', className)}
			ref={ref}
			{...props}
		/>
	)
);

Spinner.displayName = 'Spinner';
