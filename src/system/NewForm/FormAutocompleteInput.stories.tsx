/**
 * External dependencies
 */
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

/**
 * Internal dependencies
 */
import { FormAutocomplete } from './FormAutocomplete';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
	title: 'Form/Autocomplete/Input handling',
	component: FormAutocomplete,
	parameters: {
		docs: {
			description: {
				component:
					'Input callbacks can update consumer state without disrupting editing. Try replacing Old with New (same length), backspacing to empty, and editing a confirmed option. With debounce=0, onInputChange also reports short and empty queries; source is only a suggestion callback, not a notification of every edit.',
			},
		},
	},
} satisfies Meta< typeof FormAutocomplete >;
export default meta;
type Story = StoryObj< typeof meta >;

export const UpdatesConsumerState: Story = {
	args: { label: 'Organization', forLabel: 'organization-search', minLength: 3, debounce: 0 },
	play: async ( { canvasElement } ) => {
		const canvas = within( canvasElement );
		const input = canvas.getByRole< HTMLInputElement >( 'combobox' );
		const query = canvas.getByLabelText( 'Search query' );
		await userEvent.click( input );
		await userEvent.type( input, 'Example' );
		await expect( input ).toHaveValue( 'Example' );
		input.setSelectionRange( 0, input.value.length );
		await userEvent.keyboard( 'New' );
		await expect( input ).toHaveValue( 'New' );
		await expect( query ).toHaveTextContent( 'New' );
		input.setSelectionRange( 0, input.value.length );
		await userEvent.paste( 'VIP' );
		await expect( input ).toHaveValue( 'VIP' );
		await expect( query ).toHaveTextContent( 'VIP' );
		await userEvent.keyboard( '{Backspace}{Backspace}{Backspace}' );
		await expect( input ).toHaveValue( '' );
		await expect( query ).toBeEmptyDOMElement();
		canvasElement.setAttribute( 'data-input-regression', 'passed' );
	},
	render: function InputSearch( args ) {
		const [ query, setQuery ] = useState( '' );
		return (
			<>
				<FormAutocomplete
					{ ...args }
					onInputChange={ value => setQuery( value ) }
					source={ ( value, populateResults ) => populateResults( [ value + ' Org' ] ) }
				/>
				<output aria-label="Search query">{ query }</output>
			</>
		);
	},
};
