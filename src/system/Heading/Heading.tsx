/**
 * External dependencies
 */
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import { Heading as ThemeHeading, HeadingProps as ThemeHeadingProps } from 'theme-ui';

export interface HeadingProps extends ThemeHeadingProps {
	/**
	 * The heading level, which determines both the rendered HTML element and typographic style.
	 * @default 'h3'
	 */
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * A themed heading component that renders the appropriate HTML heading element (h1-h6) with design-token styling.
 */
export const Heading = forwardRef< HTMLHeadingElement, HeadingProps >(
	( { variant = 'h3', sx, className, ...rest }: HeadingProps, ref: Ref< HTMLHeadingElement > ) => (
		<ThemeHeading
			as={ variant }
			variant={ variant }
			sx={ {
				color: 'heading',
				...sx,
			} }
			className={ classNames( 'vip-heading-component', className ) }
			ref={ ref }
			{ ...rest }
		/>
	)
);

Heading.displayName = 'Heading';
