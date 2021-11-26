/**
 * External dependencies
 */
import React, { useState } from 'react';

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

export const Default = () => {
	const [ value, setValue ] = useState( 'one' );
	return <ToggleGroup value={ value } onChange={ newValue => setValue( newValue ) } groupLabel="group" options={ options } />;
};
