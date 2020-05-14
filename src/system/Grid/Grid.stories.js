import React from 'react';

import { action } from '@storybook/addon-actions';
import { Grid } from '..';

export default {
	title: 'Grid',
	component: Grid,
};

export const Default = () => <Grid>Hello</Grid>;
