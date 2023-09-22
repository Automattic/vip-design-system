/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Text as ThemeText, TextProps as ThemeTextProps, ThemeUIStyleObject } from 'theme-ui';
import classNames, { Argument } from 'classnames';

export interface TextProps extends Omit< ThemeTextProps, 'className' > {
	className?: Argument;
	sx?: ThemeUIStyleObject;
}

export const Text = forwardRef< HTMLDivElement, TextProps >(
	( { sx, className = null, ...props }: TextProps, ref: Ref< HTMLDivElement > ) => (
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
