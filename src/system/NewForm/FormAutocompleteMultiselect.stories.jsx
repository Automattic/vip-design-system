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

const shortOptions = [
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
];

const longOptions = [
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
	label: 'Ice Cream Flavors',
	options: shortOptions,
};

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', width = 250, ...rest } ) => {
	const [ selectedValues, setSelectedValues ] = useState( [] );
	return (
		<>
			<Form.Root>
				<div sx={ { width } }>
					<Form.AutocompleteMulti
						forLabel="form-autocompletemultiselect"
						label={ label }
						onChange={ obj => {
							setSelectedValues( obj );
						} }
						isMulti={ true }
						{ ...rest }
					/>
				</div>
				<div sx={ { mt: 3 } }>Selected value: { selectedValues.join( ', ' ) }</div>
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
		label: 'Select domains',
		searchIcon: true,
		required: true,
		options: longOptions,
		showAllValues: true,
		placeholder: 'Select domains',
		hasError: true,
		errorMessage: 'Domain is required.',
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

WithStaticData.displayName = 'WithStaticData';

export const WithDynamicData = () => {
	const [ selectedValues, setSelectedValues ] = useState( [] );
	const customArgs = {
		label: 'Select domains',
		searchIcon: true,
		required: true,
		placeholder: 'Start typing...',
		source: ( q, populateResults ) => {
			const filtered = longOptions.filter( option => option.label.toLowerCase().includes( q ) );
			const optionForDisplay = filtered?.map( option => option.label );
			populateResults( optionForDisplay.filter( option => ! selectedValues.includes( option ) ) );
		},
		onChange: obj => {
			setSelectedValues( obj );
		},
	};
	return (
		<>
			<Form.Root>
				<div sx={ { width: '100%' } }>
					<Form.AutocompleteMulti
						forLabel="form-autocompletemultiselect"
						label={ customArgs.label }
						onChange={ obj => {
							setSelectedValues( obj );
						} }
						hasError={ true }
						errorMessage="Please select a value."
						{ ...customArgs }
					/>
				</div>
				<div sx={ { mt: 3 } }>Selected value: { selectedValues.join( ', ' ) }</div>
			</Form.Root>
		</>
	);
};

WithDynamicData.displayName = 'WithDynamicDataFullSize';
