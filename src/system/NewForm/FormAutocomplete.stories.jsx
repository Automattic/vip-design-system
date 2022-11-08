/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
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
const DefaultComponent = ( { label = 'Label', width = 250, ...rest } ) => (
	<>
		<Form.Root>
			<div sx={ { width } }>
				<Form.Autocomplete id="form-autocomplete" label={ label } { ...rest } />
			</div>
		</Form.Root>
	</>
);

export const Default = () => {
	return (
		<>
			<DefaultComponent { ...args } />
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

export const Placeholder = () => {
	const customArgs = {
		...args,
		placeholder: 'Chocolate',
		value: 'Chocolate',
	};

	return (
		<>
			<DefaultComponent { ...customArgs } />
		</>
	);
};
