/**
 * External dependencies
 */
import { forwardRef } from 'react';
import { Box as ThemeBox } from 'theme-ui';

const Box = forwardRef( ( props, ref ) => <ThemeBox ref={ref} {...props} /> );

Box.displayName = 'Box';

export { Box };
