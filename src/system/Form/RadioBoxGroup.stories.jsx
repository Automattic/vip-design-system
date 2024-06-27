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

export const Errors = () => {
	const [ value, setValue ] = useState( null );

	return (
		<RadioBoxGroup
			defaultValue={ value }
			onChange={ e => setValue( e.target.value ) }
			options={ options }
			required
			groupLabel="Radio Box Group"
			hasError={ true }
			errorMessage="This is an error message"
		/>
	);
};

export const ChipVariant = () => {
	const [ value, setValue ] = useState( 'table' );

	return (
		<RadioBoxGroup
			defaultValue={ value }
			onChange={ e => setValue( e.target.value ) }
			options={ [
				{
					label: 'Table',
					value: 'table',
				},
				{
					label: 'Grid',
					value: 'grid',
				},
				{
					label: 'Card',
					value: 'card',
				},
			] }
			variant="chip"
		/>
	);
};
