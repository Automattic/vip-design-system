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

export const Default = {
	render: props => <DefaultComponent { ...props } />,
	args,
};

export const WithAllowCustom = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		allowCustom: true,
	},
};

export const Inline = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		isInline: true,
	},
};

export const WithDefaultValue = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		value: 'Chocolate',
	},
};

export const WithSearchIcon = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		searchIcon: true,
		placeholder: 'Type to search',
	},
};

export const WithLoading = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		loading: true,
	},
};

export const WithDebounce = {
	render: () => {
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
	},
};

export const WithSlowSearchAndDebounce = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
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
	},
};

export const WithCustomMessages = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		noOptionsMessage: () => 'No data',
		placeholder: 'Type to search',
	},
};

export const WithErrors = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		hasError: true,
		errorMessage: 'Please select a value.',
		required: true,
	},
};

export const WithArrow = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		showAllValues: true,
	},
};

export const WithCustomArrow = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		showAllValues: true,
		// eslint-disable-next-line react/display-name
		dropdownArrow: () => (
			<span sx={ { position: 'absolute', top: 1, right: 3, pointerEvents: 'none' } }>👇</span>
		),
	},
};
export const SizeVariants = {
	render: () => (
		<div>
			<h3>Size Variants</h3>
			<p>FormAutocomplete supports two sizes: large (40px, default) and small (32px, compact)</p>

			<h4>Large (Default - 40px)</h4>
			<div sx={ { maxWidth: 400, mb: 4 } }>
				<Form.Autocomplete
					size="large"
					label="Large Autocomplete"
					forLabel="autocomplete-large"
					options={ options }
					placeholder="Type to search..."
				/>
			</div>

			<h4>Small (Compact - 32px)</h4>
			<div sx={ { maxWidth: 400, mb: 4 } }>
				<Form.Autocomplete
					size="small"
					label="Small Autocomplete"
					forLabel="autocomplete-small"
					options={ options }
					placeholder="Type to search..."
				/>
			</div>

			<h4>Side by Side Comparison</h4>
			<div sx={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, maxWidth: 800 } }>
				<Form.Autocomplete
					size="large"
					label="Large"
					forLabel="autocomplete-large-2"
					options={ options }
				/>
				<Form.Autocomplete
					size="small"
					label="Small"
					forLabel="autocomplete-small-2"
					options={ options }
				/>
			</div>
		</div>
	),
};
