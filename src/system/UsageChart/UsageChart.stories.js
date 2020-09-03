/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { UsageChart } from '..';

export default {
	title: 'UsageChart',
	component: UsageChart,
};

export const Default = () => (
	<UsageChart
		total={50}
		max={75}
		variant="primary"
	/>
);
