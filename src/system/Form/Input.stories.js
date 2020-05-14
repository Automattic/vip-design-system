import React from 'react';

import { action } from '@storybook/addon-actions';
import { Input } from '..';

export default {
	title: 'Input',
	component: Input,
};

export const Default = () => <Input placeholder="Your input here..." />;
