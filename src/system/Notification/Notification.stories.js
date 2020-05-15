/**
 * External dependencies
 */
import React from 'react';

import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { Notification } from '..';

export default {
	title: 'Notification',
	component: Notification,
};

export const Default = () => (
	<Notification
		title="My first notification"
		subTitle="Use when providing success or error feedback on global action"
	/>
);
