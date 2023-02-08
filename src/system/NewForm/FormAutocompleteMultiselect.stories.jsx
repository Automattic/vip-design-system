/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { useState } from 'react';
import * as Form from '.';

export default {
	title: 'Form/AutocompleteMulti',
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
	{ value: 'strawberry', label: 'Strawberry Chocolate Vanilla Chocolate Vanilla' },
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
	const [ selectedValue, setSelectedValue ] = useState( [] );

	return (
		<>
			<Form.Root>
				<div sx={ { width } }>
					<Form.AutocompleteMulti
						forLabel="form-autocompletemultiselect"
						label={ label }
						onChange={ ( obj, val ) => {
							setSelectedValue( obj );
						} }
						isMulti={ true }
						{ ...rest }
					/>
				</div>
				<div sx={ { mt: 3 } }>Selected value: { selectedValue.join( ', ' ) }</div>
			</Form.Root>
		</>
	);
};

export const Default = () => {
	return (
		<>
			<DefaultComponent required { ...args } placeholder="Start typing..." />
		</>
	);
};

export const WithMultiselectStatic = () => {
	const customArgs = {
		...args,
		showAllValues: true,
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

WithMultiselectStatic.displayName = 'WithMulti';

export const WithMultiselectDynamic = () => {
	const customArgs = {
		source: ( q, populateResults ) => {
			const filtered = options.filter( option => option.label.toLowerCase().includes( q ) );
			populateResults( filtered.map( option => option.label ) );
		},
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

WithMultiselectDynamic.displayName = 'WithMulti';
