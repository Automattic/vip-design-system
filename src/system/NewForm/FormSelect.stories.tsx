/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { type ChangeEvent, useCallback, useState, type ComponentProps } from 'react';

import * as Form from '.';
import { Link } from '../Link';

import type { FormSelectProps, Option } from './FormSelect';

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

// Group entries carry no value; the Option type does not describe groups yet, so the
// data is cast (see the prop-type normalisation item in the roadmap).
const groupedOptions = [
	{
		label: 'Group name',
		options,
	},
	{
		label: 'Another Group name',
		options,
	},
] as unknown as Option[];

const DefaultComponent = ( {
	label = 'Label',
	width = 250,
	onChange,
	...rest
}: FormSelectProps & { width?: number | string } ) => (
	<>
		<p>
			This is a simple wrapper at the top of a browser default select component. This component
			should be used for situations where you have up to <strong>15 options</strong>. If you need to
			use a auto-complete, searchable solution, please use another component with a typeahead
			capability.
		</p>

		<p>
			This component was heavily inspired by the{ ' ' }
			<Link
				href="https://designsystem.digital.gov/components/select/"
				target="_blank"
				rel="noreferrer"
			>
				{ ' ' }
				U.S. Web Design System (USWDS) Select component
			</Link>
			.
		</p>
		<Form.Root>
			<div sx={ { width } }>
				<Form.Select forLabel="form-select" label={ label } onChange={ onChange } { ...rest } />
			</div>
		</Form.Root>
	</>
);

export const Default = {
	render: ( props: ComponentProps< typeof DefaultComponent > ) => <DefaultComponent { ...props } />,
	args: {
		placeholder: '- Select -',
		required: true,
		options,
	},
};

export const Disabled = {
	render: ( props: ComponentProps< typeof DefaultComponent > ) => <DefaultComponent { ...props } />,
	args: {
		placeholder: '- Select -',
		required: true,
		disabled: true,
		options,
	},
};

export const WithErrors = {
	render: ( props: ComponentProps< typeof DefaultComponent > ) => <DefaultComponent { ...props } />,
	args: {
		placeholder: '- Select -',
		required: true,
		hasError: true,
		errorMessage: 'This is an error message',
		options,
	},
};

export const WithGroup = {
	render: ( props: ComponentProps< typeof DefaultComponent > ) => <DefaultComponent { ...props } />,
	args: {
		label: 'Group Label',
		options: [ ...options, ...groupedOptions ],
	},
};

export const IsInline = {
	render: ( props: ComponentProps< typeof DefaultComponent > ) => <DefaultComponent { ...props } />,
	args: {
		label: 'Inline Select',
		isInline: true,
		width: '100%',
		options: groupedOptions,
	},
};

export const WithOptionLabelAndValue = {
	render: ( props: ComponentProps< typeof DefaultComponent > ) => <DefaultComponent { ...props } />,
	args: {
		label: 'Select with getOptionLabel / getOptionValue',
		width: '100%',
		options: options.map( ( { label, value } ) => ( {
			name: label,
			id: value,
		} ) ),
		getOptionLabel: ( option: { name: string } ) => option.name,
		getOptionValue: ( option: { id: string } ) => option.id,
	},
};

export const WithOnChange = {
	render: () => {
		const [ option, setOption ] = useState< {
			obj: Option | undefined;
			eventValue: string;
		} | null >( null );

		const onChange = useCallback(
			( val: Option | undefined, event: ChangeEvent< HTMLSelectElement > ) =>
				setOption( { obj: val, eventValue: event.target.value } ),
			[]
		);

		const onChangeArgs = {
			label: 'Select with onChange',
			placeholder: '- Select -',
			width: '100%',
			onChange,
			options: [ ...options, ...groupedOptions ],
		};

		return (
			<>
				<DefaultComponent { ...onChangeArgs } />
				{ option && <p>Object to JSON: { JSON.stringify( option.obj ) }</p> }
				{ option && <p>Original Event Value: { option.eventValue }</p> }
			</>
		);
	},
};
