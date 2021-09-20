/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { ToggleGroup } from '..';

export default {
	title: 'ToggleGroup',
	component: ToggleGroup,
};

const options = [
	{
		label: 'One',
		value: 'one',
	},
	{
		label: 'Two',
		value: 'two',
	},
	{
		label: 'Three',
		value: 'three',
	},
];

export const Default = () => <ToggleGroup value="one" options={ options } />;
