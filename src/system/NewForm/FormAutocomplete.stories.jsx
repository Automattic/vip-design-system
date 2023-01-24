/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { useState } from 'react';
import * as Form from '.';

export default {
	title: 'Form/Autocomplete',
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
];

const args = {
	label: 'Label',
	options,
};

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', width = 250, ...rest } ) => {
	const [ selectedValue, setSelectedValue ] = useState( null );
	return (
		<>
			<Form.Root>
				<div sx={ { width } }>
					<Form.Autocomplete
						id="form-autocomplete"
						label={ label }
						onChange={ ( obj, val ) => {
							setSelectedValue( val );
						} }
						{ ...rest }
					/>
				</div>
				<div sx={ { mt: 3 } }>Selected value: { selectedValue }</div>
			</Form.Root>
		</>
	);
};

export const Default = () => {
	return (
		<>
			<DefaultComponent required { ...args } />
		</>
	);
};

export const Inline = () => {
	const customArgs = {
		...args,
		isInline: true,
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

export const WithDefaultValue = () => {
	const customArgs = {
		...args,
		value: 'Chocolate',
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

export const WithSearchIcon = () => {
	const customArgs = {
		...args,
		searchIcon: true,
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

export const WithLoading = () => {
	const customArgs = {
		...args,
		loading: true,
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};

export const WithDebounce = () => {
	const [ value, setValue ] = useState( null );
	const customArgs = {
		...args,
		minLength: 3,
		debounce: 300,
		onInputChange: query => {
			setValue( query );
		},
	};

	return (
		<>
			Filter: { value }
			<DefaultComponent { ...customArgs } />
		</>
	);
};

export const WithCustomMessages = () => {
	const customArgs = {
		...args,
		noOptionsMessage: () => 'No data',
		placeholder: 'Type to search',
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};
export const WithErrors = () => {
	const customArgs = {
		...args,
		hasError: true,
		errorMessage: 'Please select a value',
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};
