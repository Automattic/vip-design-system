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
		debounce: {
			type: { name: 'number', required: false },
			control: { type: 'number' },
		},
		label: {
			type: { name: 'string', required: false },
			control: { type: 'text' },
		},
		resetOnBlur: {
			options: [ false, true ],
			control: { type: 'boolean' },
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
	resetOnBlur: false,
	placeholder: 'Start typing...',
};

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', width = 250, ...rest } ) => {
	const [ selectedValue, setSelectedValue ] = useState( null );
	return (
		<>
			<Form.Root>
				<div sx={ { width } }>
					<Form.Autocomplete
						forLabel="form-autocomplete"
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

export const Default = DefaultComponent.bind( {} );
Default.args = args;

export const Inline = DefaultComponent.bind( {} );
Inline.args = {
	...Default.args,
	isInline: true,
};

export const WithDefaultValue = DefaultComponent.bind( {} );
WithDefaultValue.args = {
	...Default.args,
	value: 'Chocolate',
};
export const WithSearchIcon = DefaultComponent.bind( {} );
WithSearchIcon.args = {
	...Default.args,
	searchIcon: true,
	placeholder: 'Type to search',
};
export const WithLoading = DefaultComponent.bind( {} );
WithLoading.args = {
	...Default.args,
	loading: true,
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
export const WithSlowSearchAndDebounce = DefaultComponent.bind( {} );
WithSlowSearchAndDebounce.args = {
	...Default.args,
	label: 'Label',
	autoFilter: false,
	minLength: 3,
	required: true,
	debounce: 500,
	source: async ( query, populateResults ) => {
		if ( ! query || query.length >= 3 ) {
			setTimeout( () => {
				const filteredResults = args.options
					.map( option => option.label )
					.filter( result => result.toLowerCase().indexOf( query?.toLowerCase() ) !== -1 );
				populateResults( filteredResults );
			}, 1000 );
		}
	},
};
export const WithCustomMessages = DefaultComponent.bind( {} );
WithCustomMessages.args = {
	...Default.args,
	noOptionsMessage: () => 'No data',
	placeholder: 'Type to search',
};
export const WithErrors = DefaultComponent.bind( {} );
WithErrors.args = {
	...Default.args,
	hasError: true,
	errorMessage: 'Please select a value.',
	required: true,
};

export const WithArrow = DefaultComponent.bind( {} );
WithArrow.args = {
	...Default.args,
	showAllValues: true,
};
export const WithCustomArrow = DefaultComponent.bind( {} );
WithCustomArrow.args = {
	...Default.args,
	showAllValues: true,
	// eslint-disable-next-line react/display-name
	dropdownArrow: () => (
		<span sx={ { position: 'absolute', top: '2px', right: '10px', pointerEvents: 'none' } }>
			👇
		</span>
	),
};
WithCustomArrow.displayName = 'WithCustomArrow';
