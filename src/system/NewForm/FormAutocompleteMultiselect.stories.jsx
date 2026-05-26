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
						{ ...rest }
					/>
				</div>
				<div sx={ { mt: 3 } }>Selected value: { selectedValues.join( ', ' ) }</div>
			</Form.Root>
		</>
	);
};

export const Default = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		required: true,
		placeholder: 'Start typing...',
	},
};

export const WithAllowCustom = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		allowCustom: true,
	},
};

export const WithBadges = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		listType: 'badge',
	},
};

export const WithInitialValueBadges = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		...args,
		initialValue: shortOptions.slice( 0, 2 ).map( option => option.label ),
	},
};

export const Inline = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		isInline: true,
		...args,
		showAllValues: true,
	},
};

export const WithStaticData = {
	render: props => <DefaultComponent { ...props } />,
	args: {
		label: 'Select domains',
		searchIcon: true,
		required: true,
		options: longOptions,
		showAllValues: true,
		placeholder: 'Select domains',
		hasError: true,
		errorMessage: 'Domain is required.',
	},
};

export const InlineChips = {
	render: props => <DefaultComponent { ...props } width={ 500 } />,
	args: {
		label: 'Post Categories',
		options: [
			{ value: 'breaking-news', label: 'Breaking News' },
			{ value: 'world-news', label: 'World News' },
			{ value: 'us-news', label: 'U.S. News' },
			{ value: 'climate-environment', label: 'Climate & Environment' },
			{ value: 'obituaries', label: 'Obituaries' },
			{ value: 'technology', label: 'Technology' },
			{ value: 'entertainment', label: 'Entertainment' },
			{ value: 'real-estate', label: 'Real Estate' },
		],
		variant: 'inline-chips',
		showAllValues: true,
		placeholder: 'Search categories...',
		initialValue: [
			'Breaking News',
			'World News',
			'U.S. News',
			'Climate & Environment',
			'Obituaries',
		],
	},
};

export const InlineChipsEmpty = {
	render: props => <DefaultComponent { ...props } width={ 500 } />,
	args: {
		label: 'Tags',
		options: shortOptions,
		variant: 'inline-chips',
		showAllValues: true,
		placeholder: 'Select tags...',
	},
};

export const WithDynamicData = {
	render: () => {
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
	},
};
