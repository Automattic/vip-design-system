import React from 'react';

import { action } from '@storybook/addon-actions';
import { Box } from '..';

export default {
	title: 'Box',
	component: Box,
};

export const Default = () => <Box>Hello</Box>;
