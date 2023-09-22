/**
 * External dependencies
 */
import { forwardRef, Ref } from 'react';
import { Flex as ThemeFlex, FlexProps as ThemeFlexProps } from 'theme-ui';

export const Flex = forwardRef< HTMLElement, ThemeFlexProps >(
	( props: ThemeFlexProps, ref: Ref< HTMLElement > ) => <ThemeFlex ref={ ref } { ...props } />
);

Flex.displayName = 'Flex';
