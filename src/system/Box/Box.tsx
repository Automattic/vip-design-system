/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import { Box as ThemeBox, BoxProps as ThemeBoxProps } from 'theme-ui';

export const Box = forwardRef< HTMLElement, ThemeBoxProps >(
	( props: ThemeBoxProps, ref: Ref< HTMLElement > ) => (
		<ThemeBox
			{ ...props }
			className={ classNames( 'vip-box-component', props.className ) }
			ref={ ref }
		/>
	)
);

Box.displayName = 'Box';
