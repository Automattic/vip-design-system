/**
 * External dependencies
 */
import { Ref } from 'react';
import { Flex as ThemeFlex, FlexProps as ThemeFlexProps } from 'theme-ui';

export const Flex = ( { ref, ...props }: ThemeFlexProps & { ref?: Ref< HTMLElement > } ) => (
	<ThemeFlex ref={ ref } { ...props } />
);

Flex.displayName = 'Flex';
