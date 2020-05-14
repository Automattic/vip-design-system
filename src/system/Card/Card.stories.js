import React from 'react';

import { action } from '@storybook/addon-actions';
import { Card } from '..';

export default {
	title: 'Card',
	component: Card,
};

export const Default = () => <Card>Hello</Card>;
