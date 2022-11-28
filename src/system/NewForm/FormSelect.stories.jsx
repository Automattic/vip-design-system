/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { useCallback, useState } from 'react';
import * as Form from '.';

export default {
	title: 'Form/Select',
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

const groupedOptions = [
	{
		label: 'Group name',
		options: options,
	},
	{
		label: 'Another Group name',
		options: options,
	},
];

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', width = 250, onChange, ...rest } ) => (
	<>
		<p>
			This is a simple wrapper at the top of a browser default select component. This component
			should be used for situations where you have up to <strong>15 options</strong>. If you need to
			use a auto-complete, searchable solution, please use another component with a typeahead
			capability.
		</p>

		<p>
			This component was heavily inspired by the{ ' ' }
			<a
				href="https://designsystem.digital.gov/components/select/"
				target="_blank"
				rel="noreferrer"
			>
				{ ' ' }
				U.S. Web Design System (USWDS) Select component
			</a>
			.
		</p>
		<Form.Root>
			<div sx={ { width } }>
				<Form.Select id="form-select" label={ label } onChange={ onChange } { ...rest } />
			</div>
		</Form.Root>
	</>
);

export const Default = DefaultComponent.bind( {} );
Default.args = {
	placeholder: '- Select -',
	required: true,
	options,
};

export const WithGroup = DefaultComponent.bind( {} );

WithGroup.args = {
	label: 'Group Label',
	options: [ ...options, ...groupedOptions ],
};

export const IsInline = DefaultComponent.bind( {} );

IsInline.args = {
	label: 'Inline Select',
	isInline: true,
	width: '100%',
	options: groupedOptions,
};

export const WithOptionLabelAndValue = DefaultComponent.bind( {} );

WithOptionLabelAndValue.args = {
	label: 'Select with getOptionLabel / getOptionValue',
	width: '100%',
	options: options.map( ( { label, value } ) => ( {
		name: label,
		id: value,
	} ) ),
	getOptionLabel: option => option.name,
	getOptionValue: option => option.id,
};

export const WithOnChange = () => {
	const [ option, setOption ] = useState( null );

	const onChange = useCallback( ( val, event ) =>
		setOption( { obj: val, eventValue: event.target.value } )
	);

	const args = {
		label: 'Select with onChange',
		placeholder: '- Select -',
		width: '100%',
		onChange,
		options: [ ...options, ...groupedOptions ],
	};

	return (
		<>
			<DefaultComponent onChange={ onChange } { ...args } />
			{ option && <p>Object to JSON: { JSON.stringify( option.obj ) }</p> }
			{ option && <p>Original Event Value: { option.eventValue }</p> }
		</>
	);
};
