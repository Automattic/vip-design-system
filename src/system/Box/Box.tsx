/**
 * External dependencies
 */
import React, { Ref } from 'react';
import classNames, { Argument } from 'classnames';
import { Box as ThemeBox, BoxProps as ThemeBoxProps } from 'theme-ui';

export interface BoxProps extends Omit< ThemeBoxProps, 'className' > {
	className?: Argument;
}

export const Box = React.forwardRef< HTMLElement, BoxProps >(
	( props: BoxProps, ref: Ref< HTMLElement > ) => (
		<ThemeBox
			{ ...props }
			className={ classNames( 'vip-box-component', props.className ) }
			ref={ ref }
		/>
	)
);

Box.displayName = 'Box';
