/**
 * External dependencies
 */
import classNames from 'classnames';
import { Ref } from 'react';
import { Text as ThemeText, TextProps as ThemeTextProps } from 'theme-ui';

/**
 * A general-purpose text component that renders a themed paragraph (`<p>`) by default.
 */
export const Text = ( {
	sx,
	className,
	ref,
	...props
}: ThemeTextProps & { ref?: Ref< HTMLParagraphElement > } ) => (
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
);

Text.displayName = 'Text';
