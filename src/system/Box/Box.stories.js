/**
 * External dependencies
 */
import React from 'react';

import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { Box } from '..';

export default {
	title: 'Box',
	component: Box,
};

export const Default = () => <Box>Hello</Box>;
