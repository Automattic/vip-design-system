/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { RadioBoxGroup } from '..';

export default {
	title: 'RadioBoxGroup',
	component: RadioBoxGroup,
};

const options = [
	{
		label: 'One',
		value: 'one',
		description: 'This is a description',
	},
	{
		label: 'Two',
		value: 'two',
		description: 'This is a description',
	},
	{
		label: 'Three',
		value: 'three',
		description: 'This is a description',
	},
];

export const Default = () => {
	const [ value, setValue ] = useState( 'one' );
	return (
		<RadioBoxGroup
			defaultValue={ value }
			onChange={ e => setValue( e.target.value ) }
			options={ options }
			optionWidth="350px"
		/>
	);
};
