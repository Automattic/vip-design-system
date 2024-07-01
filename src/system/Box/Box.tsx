/**
 * External dependencies
 */
import classNames from 'classnames';
import { forwardRef, Ref } from 'react';
import { Box as ThemeBox, BoxProps as ThemeBoxProps } from 'theme-ui';

export const Box = forwardRef< HTMLElement, ThemeBoxProps >(
	( props: ThemeBoxProps, ref: Ref< HTMLElement > ) => (
		<ThemeBox
			className={ classNames( 'vip-box-component', props.className ) }
			ref={ ref }
			{ ...props }
		/>
	)
);

Box.displayName = 'Box';
