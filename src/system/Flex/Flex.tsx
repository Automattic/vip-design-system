/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Flex as ThemeFlex, FlexProps as ThemeFlexProps } from 'theme-ui';

export interface FlexProps extends ThemeFlexProps {}

export const Flex = forwardRef< HTMLElement, FlexProps >(
	( props: FlexProps, ref: Ref< HTMLElement > ) => <ThemeFlex ref={ ref } { ...props } />
);

Flex.displayName = 'Flex';
