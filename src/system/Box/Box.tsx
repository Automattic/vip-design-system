/**
 * External dependencies
 */
import React, { Ref } from 'react';
import classNames, { Argument } from 'classnames';
import { Box as ThemeBox, BoxProps } from 'theme-ui';

export interface Props extends Omit< BoxProps, 'className' > {
	className?: Argument;
}

export const Box = React.forwardRef< HTMLDivElement, Props >(
	( props: Props, ref: Ref< HTMLDivElement > ) => (
		<ThemeBox
			{ ...props }
			className={ classNames( 'vip-box-component', props.className ) }
			ref={ ref }
		/>
	)
);

Box.displayName = 'Box';
