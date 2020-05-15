/**
 * External dependencies
 */
import React from 'react';

import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { Grid } from '..';

export default {
	title: 'Grid',
	component: Grid,
};

export const Default = () => <Grid>Hello</Grid>;
