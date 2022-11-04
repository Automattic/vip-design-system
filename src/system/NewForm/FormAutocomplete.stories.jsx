/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { useCallback, useState } from 'react';
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

const defaultOptions = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry Chocolate Vanilla Chocolate Vanilla' },
	{ value: 'vanilla', label: 'Vanilla' },
];

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', width = 250, onChange, ...rest } ) => (
	<>
		<Form.Root>
			<div sx={ { width } }>
				<Form.Autocomplete
					id="form-autocomplete"
					label={ label }
					onChange={ onChange }
					{ ...rest }
				/>
			</div>
		</Form.Root>
	</>
);

export const Default = () => {
	const onChange = useCallback( ( object, value ) => {
		console.log( object, value );
	} );

	const args = {
		label: 'Label',
		options: defaultOptions,
	};

	return (
		<>
			<DefaultComponent onChange={ onChange } { ...args } />
		</>
	);
};

export const Inline = () => {
	const onChange = useCallback( ( object, value ) => {
		console.log( object, value );
	} );

	const args = {
		label: 'Label',
		options: defaultOptions,
	};

	return (
		<>
			<DefaultComponent isInline={ true } onChange={ onChange } { ...args } />
		</>
	);
};
