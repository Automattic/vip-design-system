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
	{ value: 'chocolate', label: 'www.chocolate.com' },
	{ value: 'strawberry', label: 'www.chocolatevanillastrawberry.com' },
	{ value: 'vanilla', label: 'www.vanilla.com' },
	{ value: 'pistachio', label: 'www.pistachio.com' },
	{ value: 'bubblegum', label: 'www.bubblegum.com' },
	{ value: 'ube', label: 'www.ube.com' },
	{ value: 'mango', label: 'www.mango.com' },
	{ value: 'buko', label: 'www.buko.com' },
	{ value: 'durian', label: 'www.thesuperfruitdurian.com' },
	{ value: 'lecheflan', label: 'www.deliciousdessertnamedfromcursewordlecheflan.com' },
	{
		value: 'optionwithspace',
		label: 'This a very long option that has spaces and it should wrap.',
	},
];

const args = {
	label: 'Domains',
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
						onChange={ obj => {
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

export const Inline = () => {
	const customArgs = {
		isInline: true,
		...args,
		showAllValues: true,
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

Inline.displayName = 'Inline';

export const WithStaticData = () => {
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

WithStaticData.displayName = 'WithStaticData';

export const WithDynamicData = () => {
	const customArgs = {
		label: 'Select domains',
		searchIcon: true,
		required: true,
		placeholder: 'Start typing...',
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

WithDynamicData.displayName = 'WithDynamicData';
