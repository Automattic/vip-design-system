/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx, Box as ThemeBox } from 'theme-ui';

const Box = forwardRef( ( props, ref ) => <ThemeBox ref={ref} {...props} /> );

export { Box };
