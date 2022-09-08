/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
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
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

// eslint-disable-next-line react/prop-types
const DefaultComponent = ( { label = 'Label', ...rest } ) => (
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
			<Form.Select id="form-select" label={ label } { ...rest } />
		</Form.Root>
	</>
);

export const Default = DefaultComponent.bind( {} );
Default.args = {
	placeholder: '- Select -',
	options: options,
};

export const WithGroup = DefaultComponent.bind( {} );

WithGroup.args = {
	label: 'Group Label',
	options: [
		{
			label: 'Group name',
			options: options,
		},
		{
			label: 'Another Group name',
			options: options,
		},
	],
};
