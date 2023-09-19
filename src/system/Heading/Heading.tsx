/**
 * External dependencies
 */
import React, { Ref } from 'react';
import {
	Heading as ThemeHeading,
	HeadingProps as ThemeHeadingProps,
	ThemeUIStyleObject,
} from 'theme-ui';
import classNames, { Argument } from 'classnames';

// We must Omit className because we are overriding its default React implementation.
// Also, while the sx and variant props may seem redundant, specifying them here
// exposes them in Storybook's controls panel.
export interface HeadingProps extends Omit< ThemeHeadingProps, 'className' > {
	className?: Argument;
	sx?: ThemeUIStyleObject;
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = React.forwardRef< HTMLHeadingElement, HeadingProps >(
	( { variant = 'h3', sx, className, ...rest }, ref: Ref< HTMLHeadingElement > ) => (
		<ThemeHeading
			sx={ {
				color: 'heading',
				// pass variant prop to sx
				variant: `text.${ variant.toString() }`,
				...sx,
			} }
			className={ classNames( 'vip-heading-component', className ) }
			ref={ ref }
			variant={ variant }
			{ ...rest }
		/>
	)
);

Heading.displayName = 'Heading';
