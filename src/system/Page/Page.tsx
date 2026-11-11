import { Box } from '../Box/Box';

import type { ComponentProps } from 'react';

export const Page = ( props: ComponentProps< typeof Box > ) => <Box { ...props } />;
