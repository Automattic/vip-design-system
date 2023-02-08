/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { useState } from 'react';
import * as Form from '.';

export default {
	title: 'Form/AutocompleteMultiselect',
	argTypes: {
		placeholder: {
			type: { name: 'string', required: false },
			control: { type: 'text' },
		},
		label: {
			type: { name: 'string', required: false },
			control: { type: 'text' },
		},
	},
};

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
	{ value: 'pistachio', label: 'Pistachio' },
	{ value: 'bubblegum', label: 'Bubblegum' },
	{ value: 'ube', label: 'Ube' },
	{ value: 'mango', label: 'Mango' },
	{ value: 'buko', label: 'Buko' },
	{ value: 'durian', label: 'Durian' },
	{ value: 'lecheflan', label: 'Leche Flan' },
	{
		value: 'averylongicecreamflavor',
		label: 'This is a very long ice cream flavorrrr with no name but it tastes goooooooood...',
	},
];

const args = {
	label: 'Ice Cream Flavors',
	options,
};

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', width = 250, ...rest } ) => {
	const [ selectedValues, setSelectedValues ] = useState( [] );
	return (
		<>
			<Form.Root>
				<div sx={ { width } }>
					<Form.AutocompleteMulti
						forLabel="form-autocomplete"
						label={ label }
						onChange={ ( obj, val ) => {
							setSelectedValues( val );
						} }
						{ ...rest }
					/>
				</div>
				<div sx={ { mt: 3 } }>Selected values: { selectedValues.join( ', ' ) }</div>
			</Form.Root>
		</>
	);
};

export const Default = () => {
	const customArgs = {
		...args,
		hasError: true,
		errorMessage: 'Please select a value.',
		required: true,
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

export const WithSource = () => {
	const customArgs = {
		...args,
		source: async ( query, populateResults ) => {
			const results = args.options.filter( option =>
				option.label.toLowerCase().includes( query.toLowerCase() )
			);
			populateResults( results );
		},
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};
