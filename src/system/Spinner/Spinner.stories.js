/**
 * External dependencies
 */
import React from 'react';

import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { Spinner } from '..';

export default {
	title: 'Spinner',
	component: Spinner,
};

export const Default = () => <Spinner />;
