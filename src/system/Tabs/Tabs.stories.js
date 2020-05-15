/**
 * External dependencies
 */
import React from 'react';

import { action } from '@storybook/addon-actions';

/**
 * Internal dependencies
 */
import { Tabs, TabItem } from '..';

export default {
	title: 'Tabs',
	component: Tabs,
};

export const Default = () => (
	<Tabs>
		<TabItem active>All (5)</TabItem>
		<TabItem>Live (2)</TabItem>
		<TabItem>In Development (3)</TabItem>
	</Tabs>
);
