/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Text as ThemeText, TextProps as ThemeTextProps } from 'theme-ui';
import classNames from 'classnames';

export const Text = forwardRef< HTMLDivElement, ThemeTextProps >(
	( { sx, className, ...props }: ThemeTextProps, ref: Ref< HTMLDivElement > ) => (
		<ThemeText
			as="p"
			sx={ {
				lineHeight: 1.5,
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
