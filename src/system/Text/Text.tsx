/**
 * External dependencies
 */
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import { Text as ThemeText, TextProps as ThemeTextProps } from 'theme-ui';

/**
 * A general-purpose text component that renders a themed paragraph (`<p>`) by default.
 */
export const Text = forwardRef< HTMLDivElement, ThemeTextProps >(
	( { sx, className, ...props }: ThemeTextProps, ref: Ref< HTMLDivElement > ) => (
		<ThemeText
			as="p"
			sx={ {
				marginBottom: 2,
				color: 'text',
				...sx,
			} }
			className={ classNames( 'vip-text-component', className ) }
			ref={ ref }
			{ ...props }
		/>
	)
);

Text.displayName = 'Text';
