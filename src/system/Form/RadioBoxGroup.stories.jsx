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
	parameters: {
		docs: {
			description: {
				component: `
A radio-box-group is a group of radio buttons that are styled as boxes. This component is used
to allow users to select one option from a list of options.

## Guidance

### When to use the component

- <strong>Select an option in a form.</strong> Use a radio-box-group when you want users to select
a single option from a list of options.
- <strong>Use as a toggle-group.</strong> Use a radio-box-group with the chip variant when you want
to allow users to toggle between different options.

-------

This documentation is heavily inspired by the [U.S Web Design System (USWDS)](https://designsystem.digital.gov/components/tooltip/#package). We use USWDS as trusted source of truth for accessibility and usability best practices.

## Component Properties
`,
			},
		},
	},
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
