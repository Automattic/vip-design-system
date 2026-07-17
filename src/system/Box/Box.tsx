/**
 * External dependencies
 */
import classNames from 'classnames';
import { Ref } from 'react';
import { Box as ThemeBox, BoxProps as ThemeBoxProps } from 'theme-ui';

export const Box = ( { ref, ...props }: ThemeBoxProps & { ref?: Ref< HTMLElement > } ) => (
	<ThemeBox
		className={ classNames( 'vip-box-component', props.className ) }
		ref={ ref }
		{ ...props }
	/>
);

Box.displayName = 'Box';
