/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Heading as ThemeHeading, HeadingProps as ThemeHeadingProps } from 'theme-ui';
import classNames, { Argument } from 'classnames';

export interface HeadingProps extends ThemeHeadingProps {
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = forwardRef< HTMLHeadingElement, HeadingProps >(
	( { variant = 'h3', sx, className, ...rest }: HeadingProps, ref: Ref< HTMLHeadingElement > ) => (
		<ThemeHeading
			as={ variant }
			sx={ {
				color: 'heading',
				// pass variant prop to sx
				variant: `text.${ variant.toString() }`,
				...sx,
			} }
			className={ classNames( 'vip-heading-component', className ) }
			ref={ ref }
			{ ...rest }
		/>
	)
);

Heading.displayName = 'Heading';
