/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { RadioGroupChip } from './RadioGroupChip';

export default {
	title: 'RadioGroupChip',
	component: RadioGroupChip,
	parameters: {
		docs: {
			description: {
				component: `
A radio-group-chip is a group of radio buttons that are styled as boxes. This component is used
to allow users to toggle between different options

-------

This documentation is heavily inspired by the [U.S Web Design System (USWDS)](https://designsystem.digital.gov/components/tooltip/#package). We use USWDS as trusted source of truth for accessibility and usability best practices.

## Component Properties
`,
			},
		},
	},
};

export const MediumSize = () => {
	const [ value, setValue ] = useState( 'table' );

	return (
		<RadioGroupChip
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
			] }
		/>
	);
};

export const SmallSize = () => {
	const [ value, setValue ] = useState( 'table' );

	return (
		<RadioGroupChip
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
			] }
			size="small"
		/>
	);
};
