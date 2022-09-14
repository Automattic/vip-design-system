/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Flex as ThemeFlex } from 'theme-ui';

const Flex = React.forwardRef( ( props, forwardRef ) => (
	<ThemeFlex ref={ forwardRef } { ...props } />
) );

Flex.displayName = 'Flex';

export { Flex };
