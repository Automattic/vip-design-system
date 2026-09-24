/**
 * External dependencies
 */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { FormAutocomplete } from './FormAutocomplete';

// The consumer rerenders on input, as async searches do when clearing results
// and updating loading state. The input itself remains owned by Autocomplete.
const Search = ( { onInputChange, debounce = 0 } ) => {
	const [ query, setQuery ] = useState( '' );
	return (
		<>
			<FormAutocomplete
				label="Organization"
				forLabel="organization"
				minLength={ 3 }
				debounce={ debounce }
				onInputChange={ value => {
					setQuery( value );
					onInputChange( value );
				} }
				source={ ( value, populateResults ) => populateResults( [ value + ' Org' ] ) }
			/>
			<output aria-label="Search query">{ query }</output>
		</>
	);
};

describe( 'Autocomplete input-driven consumer state', () => {
	it( 'reports same-length replacements and clearing without restoring the old text', async () => {
		const user = userEvent.setup();
		const onInputChange = jest.fn();
		render( <Search onInputChange={ onInputChange } /> );
		const input = screen.getByRole< HTMLInputElement >( 'combobox' );

		await user.type( input, 'Old' );
		input.setSelectionRange( 0, 3 );
		await user.paste( 'New' );
		expect( input ).toHaveValue( 'New' );
		expect( screen.getByLabelText( 'Search query' ) ).toHaveTextContent( 'New' );
		expect( onInputChange.mock.calls ).toEqual( [ [ 'O' ], [ 'Ol' ], [ 'Old' ], [ 'New' ] ] );

		await user.keyboard( '{Backspace}{Backspace}{Backspace}' );
		expect( input ).toHaveValue( '' );
		expect( onInputChange.mock.calls.slice( -3 ) ).toEqual( [ [ 'Ne' ], [ 'N' ], [ '' ] ] );
		expect( screen.getByLabelText( 'Search query' ) ).toBeEmptyDOMElement();
	} );

	it( 'allows editing and clearing after confirming an option', async () => {
		const user = userEvent.setup();
		const onInputChange = jest.fn();
		render( <Search onInputChange={ onInputChange } /> );
		const input = screen.getByRole< HTMLInputElement >( 'combobox' );
		await user.type( input, 'Old' );
		await user.click( screen.getByRole( 'option', { name: 'Old Org' } ) );
		expect( input ).toHaveValue( 'Old Org' );
		await user.clear( input );
		expect( input ).toHaveValue( '' );
		expect( onInputChange ).toHaveBeenLastCalledWith( '' );
		await user.type( input, 'New' );
		expect( input ).toHaveValue( 'New' );
		expect( onInputChange ).toHaveBeenLastCalledWith( 'New' );
	} );

	it( 'preserves debouncing across consumer rerenders and reports a cleared query', async () => {
		jest.useFakeTimers();
		try {
			const user = userEvent.setup( { advanceTimers: jest.advanceTimersByTime } );
			const onInputChange = jest.fn();
			const { rerender } = render( <Search onInputChange={ onInputChange } debounce={ 250 } /> );
			const input = screen.getByRole< HTMLInputElement >( 'combobox' );
			await user.type( input, 'Old' );
			rerender( <Search onInputChange={ onInputChange } debounce={ 250 } /> );
			input.setSelectionRange( 0, 3 );
			await user.paste( 'New' );
			expect( onInputChange ).not.toHaveBeenCalled();
			act( () => jest.advanceTimersByTime( 250 ) );
			expect( onInputChange.mock.calls ).toEqual( [ [ 'New' ] ] );
			await user.clear( input );
			act( () => jest.advanceTimersByTime( 250 ) );
			expect( input ).toHaveValue( '' );
			expect( onInputChange.mock.calls ).toEqual( [ [ 'New' ], [ '' ] ] );
		} finally {
			jest.useRealTimers();
		}
	} );
} );
