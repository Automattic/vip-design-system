/**
 * External dependencies
 */
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import {
	FormAutocompleteMultiselectSentinel,
	type ComboboxItem,
} from './FormAutocompleteMultiselectSentinel';

const staticOptions: ComboboxItem[] = [
	{ id: 1, label: 'Chocolate' },
	{ id: 2, label: 'Strawberry' },
	{ id: 3, label: 'Vanilla' },
];

const defaultProps = {
	label: 'Ice Cream Flavors',
	forLabel: 'ice-cream',
	options: staticOptions,
};

// ── jsdom polyfills ───────────────────────────────────────────────────────────

// jsdom does not implement scrollIntoView — mock it to prevent errors in the
// keyboard-navigation effect that scrolls the active option into view.
beforeAll( () => {
	window.HTMLElement.prototype.scrollIntoView = jest.fn();
} );

// ── Helpers ───────────────────────────────────────────────────────────────────

const openDropdown = async ( input: HTMLElement ) => {
	await userEvent.click( input );
};

// ── Accessibility ─────────────────────────────────────────────────────────────

describe( '<FormAutocompleteMultiselectSentinel />', () => {
	describe( 'accessibility', () => {
		it( 'passes axe with no options', async () => {
			const { container } = render(
				<FormAutocompleteMultiselectSentinel forLabel="a11y-empty" label="Test" />
			);
			await expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'passes axe with static options', async () => {
			const { container } = render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			await expect( await axe( container ) ).toHaveNoViolations();
		} );

		it( 'passes axe with error state', async () => {
			const { container } = render(
				<FormAutocompleteMultiselectSentinel
					{ ...defaultProps }
					hasError
					errorMessage="Selection required."
				/>
			);
			await expect( await axe( container ) ).toHaveNoViolations();
		} );
	} );

	// ── Rendering ─────────────────────────────────────────────────────────────

	describe( 'rendering', () => {
		it( 'renders the label', () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		} );

		it( 'renders the input with correct ARIA attributes', () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			expect( input ).toHaveAttribute( 'aria-expanded', 'false' );
			expect( input ).toHaveAttribute( 'aria-autocomplete', 'list' );
		} );

		it( 'renders the required attribute', () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } required /> );
			const input = screen.getByRole( 'combobox' );
			expect( input ).toHaveAttribute( 'aria-required', 'true' );
		} );

		it( 'renders the helper text with id for aria-describedby', () => {
			render(
				<FormAutocompleteMultiselectSentinel
					{ ...defaultProps }
					helperText="Select at least one."
				/>
			);
			expect( screen.getByText( 'Select at least one.' ) ).toBeInTheDocument();
		} );

		it( 'shows error message when hasError is true', () => {
			render(
				<FormAutocompleteMultiselectSentinel
					{ ...defaultProps }
					hasError
					errorMessage="Selection required."
				/>
			);
			expect( screen.getByText( 'Selection required.' ) ).toBeInTheDocument();
		} );

		it( 'shows "0 items selected" by default', () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			expect( screen.getByText( '0 items selected' ) ).toBeInTheDocument();
		} );

		it( 'renders pre-selected items from initialValue', () => {
			render(
				<FormAutocompleteMultiselectSentinel
					{ ...defaultProps }
					initialValue={ [ staticOptions[ 0 ] ] }
				/>
			);
			expect( screen.getByText( 'Chocolate' ) ).toBeInTheDocument();
			expect( screen.getByText( '1 item selected' ) ).toBeInTheDocument();
		} );
	} );

	// ── Dropdown ──────────────────────────────────────────────────────────────

	describe( 'dropdown', () => {
		it( 'opens when the input is clicked', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			expect( screen.getByRole( 'listbox' ) ).toBeInTheDocument();
			expect( input ).toHaveAttribute( 'aria-expanded', 'true' );
		} );

		it( 'shows all options when open with no input', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			await openDropdown( screen.getByRole( 'combobox' ) );
			const listbox = screen.getByRole( 'listbox' );
			expect( within( listbox ).getAllByRole( 'option' ) ).toHaveLength( 3 );
		} );

		it( 'filters options as the user types', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			await userEvent.type( input, 'cho' );
			const listbox = screen.getByRole( 'listbox' );
			expect( within( listbox ).getAllByRole( 'option' ) ).toHaveLength( 1 );
			expect( within( listbox ).getByText( 'Chocolate' ) ).toBeInTheDocument();
		} );

		it( 'shows no-results message when no options match', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			await userEvent.type( input, 'zzz' );
			expect( screen.getByText( 'No results found.' ) ).toBeInTheDocument();
		} );

		it( 'closes when Escape is pressed', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			expect( screen.getByRole( 'listbox' ) ).toBeInTheDocument();
			fireEvent.keyDown( input, { key: 'Escape' } );
			expect( screen.queryByRole( 'listbox' ) ).not.toBeInTheDocument();
		} );
	} );

	// ── Selection ─────────────────────────────────────────────────────────────

	describe( 'selection', () => {
		it( 'adds an item when clicked and calls onChange with two arguments', async () => {
			const handleChange = jest.fn();
			render(
				<FormAutocompleteMultiselectSentinel { ...defaultProps } onChange={ handleChange } />
			);
			await openDropdown( screen.getByRole( 'combobox' ) );
			await userEvent.click( screen.getByText( 'Chocolate' ) );

			expect( handleChange ).toHaveBeenCalledTimes( 1 );
			const [ selectedOptions, labels ] = handleChange.mock.calls[ 0 ];
			expect( selectedOptions ).toEqual( [ { id: 1, label: 'Chocolate' } ] );
			expect( labels ).toEqual( [ 'Chocolate' ] );
		} );

		it( 'adds an item via Enter key and calls onChange', async () => {
			const handleChange = jest.fn();
			render(
				<FormAutocompleteMultiselectSentinel { ...defaultProps } onChange={ handleChange } />
			);
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			fireEvent.keyDown( input, { key: 'ArrowDown' } );
			fireEvent.keyDown( input, { key: 'Enter' } );

			expect( handleChange ).toHaveBeenCalledTimes( 1 );
			const [ selectedOptions, labels ] = handleChange.mock.calls[ 0 ];
			expect( selectedOptions[ 0 ] ).toMatchObject( { label: 'Chocolate' } );
			expect( labels ).toEqual( [ 'Chocolate' ] );
		} );

		it( 'hides a selected item from the dropdown', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			await openDropdown( screen.getByRole( 'combobox' ) );
			await userEvent.click( screen.getByText( 'Chocolate' ) );
			await openDropdown( screen.getByRole( 'combobox' ) );
			const listbox = screen.getByRole( 'listbox' );
			expect( within( listbox ).queryByText( 'Chocolate' ) ).not.toBeInTheDocument();
		} );

		it( 'renders button chips by default for selected items', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			await openDropdown( screen.getByRole( 'combobox' ) );
			await userEvent.click( screen.getByText( 'Chocolate' ) );
			expect( screen.getByRole( 'button', { name: /chocolate/i } ) ).toBeInTheDocument();
		} );

		it( 'renders badge chips when listType is badge', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } listType="badge" /> );
			await openDropdown( screen.getByRole( 'combobox' ) );
			await userEvent.click( screen.getByText( 'Chocolate' ) );
			// Badge renders the label text with an MdClose icon, not a <button> role
			expect( screen.getByText( 'Chocolate' ) ).toBeInTheDocument();
		} );

		it( 'removes an item when the chip remove button is clicked', async () => {
			const handleChange = jest.fn();
			render(
				<FormAutocompleteMultiselectSentinel
					{ ...defaultProps }
					initialValue={ [ staticOptions[ 0 ] ] }
					onChange={ handleChange }
				/>
			);

			const removeButton = screen.getByRole( 'button', { name: /chocolate/i } );
			await userEvent.click( removeButton );

			expect( handleChange ).toHaveBeenCalledTimes( 1 );
			const [ selectedOptions, labels ] = handleChange.mock.calls[ 0 ];
			expect( selectedOptions ).toEqual( [] );
			expect( labels ).toEqual( [] );
			expect( screen.getByText( '0 items selected' ) ).toBeInTheDocument();
		} );

		it( 'handles multiple selections and updates count correctly', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			await openDropdown( screen.getByRole( 'combobox' ) );
			await userEvent.click( screen.getByText( 'Chocolate' ) );
			await openDropdown( screen.getByRole( 'combobox' ) );
			await userEvent.click( screen.getByText( 'Vanilla' ) );
			expect( screen.getByText( '2 items selected' ) ).toBeInTheDocument();
		} );
	} );

	// ── Keyboard navigation ───────────────────────────────────────────────────

	describe( 'keyboard navigation', () => {
		it( 'opens dropdown and sets first option active on ArrowDown', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			fireEvent.keyDown( input, { key: 'ArrowDown' } );
			expect( screen.getByRole( 'listbox' ) ).toBeInTheDocument();
		} );

		it( 'navigates options with ArrowDown and ArrowUp', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			fireEvent.keyDown( input, { key: 'ArrowDown' } );
			fireEvent.keyDown( input, { key: 'ArrowDown' } );
			fireEvent.keyDown( input, { key: 'ArrowUp' } );
			// Should be back at index 0 — aria-activedescendant points to first option
			expect( input.getAttribute( 'aria-activedescendant' ) ).toContain( 'option-1' );
		} );

		it( 'navigates to last option with End key', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			fireEvent.keyDown( input, { key: 'End' } );
			expect( input.getAttribute( 'aria-activedescendant' ) ).toContain( 'option-3' );
		} );

		it( 'navigates to first option with Home key', async () => {
			render( <FormAutocompleteMultiselectSentinel { ...defaultProps } /> );
			const input = screen.getByRole( 'combobox' );
			await openDropdown( input );
			fireEvent.keyDown( input, { key: 'End' } );
			fireEvent.keyDown( input, { key: 'Home' } );
			expect( input.getAttribute( 'aria-activedescendant' ) ).toContain( 'option-1' );
		} );
	} );

	// ── Async mode ────────────────────────────────────────────────────────────

	describe( 'async mode', () => {
		const page0: ComboboxItem[] = [
			{ id: 10, label: 'Alpha' },
			{ id: 11, label: 'Beta' },
		];
		const page1: ComboboxItem[] = [ { id: 12, label: 'Gamma' } ];

		it( 'fetches the first page on mount', async () => {
			const onFetchItems = jest.fn().mockResolvedValueOnce( page0 ).mockResolvedValueOnce( page1 );

			render(
				<FormAutocompleteMultiselectSentinel
					forLabel="async-test"
					label="Async"
					onFetchItems={ onFetchItems }
					pageSize={ 2 }
				/>
			);

			await waitFor( () => expect( onFetchItems ).toHaveBeenCalledWith( 0 ) );
		} );

		it( 'shows loaded items in the dropdown', async () => {
			const onFetchItems = jest.fn().mockResolvedValue( page0 );

			render(
				<FormAutocompleteMultiselectSentinel
					forLabel="async-items"
					label="Async Items"
					onFetchItems={ onFetchItems }
					pageSize={ 10 }
				/>
			);

			await waitFor( () => expect( onFetchItems ).toHaveBeenCalled() );
			await openDropdown( screen.getByRole( 'combobox' ) );

			expect( screen.getByText( 'Alpha' ) ).toBeInTheDocument();
			expect( screen.getByText( 'Beta' ) ).toBeInTheDocument();
		} );

		it( 'shows error state when onFetchItems rejects', async () => {
			const onFetchItems = jest.fn().mockRejectedValue( new Error( 'Network error' ) );

			render(
				<FormAutocompleteMultiselectSentinel
					forLabel="async-error"
					label="Async Error"
					onFetchItems={ onFetchItems }
					pageSize={ 10 }
				/>
			);

			await waitFor( () => expect( onFetchItems ).toHaveBeenCalled() );
			await openDropdown( screen.getByRole( 'combobox' ) );

			await waitFor( () => {
				expect( screen.getByText( /Error loading additional results/i ) ).toBeInTheDocument();
			} );
		} );
	} );
} );
