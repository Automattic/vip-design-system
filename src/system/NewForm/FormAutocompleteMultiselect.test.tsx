/**
 * External dependencies
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { FormAutocompleteMultiselect } from './FormAutocompleteMultiselect';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry Chocolate Vanilla Chocolate Vanilla' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const defaultProps = {
	label: 'This is a label',
	options,
};

describe( '<FormAutocompleteMultiselect />', () => {
	it( 'renders the FormAutocompleteMultiselect component', async () => {
		const { container } = render(
			<FormAutocompleteMultiselect forLabel="my_desert_list" label="This is a label" />
		);
		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
	it( 'renders the FormAutocompleteMultiselect component with options', async () => {
		const { container } = render(
			<FormAutocompleteMultiselect forLabel="my_desert_list" { ...defaultProps } />
		);
		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'forwards input attributes', () => {
		render(
			<FormAutocompleteMultiselect
				{ ...defaultProps }
				id="dessert-search"
				name="dessert"
				aria-describedby="dessert-help"
			/>
		);

		const input = screen.getByLabelText( defaultProps.label );

		expect( input ).toHaveAttribute( 'id', 'dessert-search' );
		expect( input ).toHaveAttribute( 'name', 'dessert' );
		expect( input ).toHaveAttribute(
			'aria-describedby',
			expect.stringContaining( 'dessert-help' )
		);
	} );
} );

describe( '<FormAutocompleteMultiselect variant="inline-chips" />', () => {
	it( 'renders the inline-chips variant', async () => {
		const { container } = render(
			<FormAutocompleteMultiselect
				forLabel="my_inline_chips"
				label="Categories"
				options={ options }
				variant="inline-chips"
				showAllValues
			/>
		);
		expect( screen.getByLabelText( 'Categories' ) ).toBeInTheDocument();
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders initial values as inline chips', () => {
		render(
			<FormAutocompleteMultiselect
				forLabel="my_inline_chips_init"
				label="Categories"
				options={ options }
				variant="inline-chips"
				showAllValues
				initialValue={ [ 'Chocolate', 'Vanilla' ] }
			/>
		);
		expect( screen.getByText( 'Chocolate' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Vanilla' ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Remove Chocolate' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Remove Vanilla' } ) ).toBeInTheDocument();
	} );

	it( 'removes a chip when the close button is clicked', () => {
		render(
			<FormAutocompleteMultiselect
				forLabel="my_inline_chips_remove"
				label="Categories"
				options={ options }
				variant="inline-chips"
				showAllValues
				initialValue={ [ 'Chocolate', 'Vanilla' ] }
			/>
		);
		expect( screen.getByText( 'Chocolate' ) ).toBeInTheDocument();
		fireEvent.click( screen.getByRole( 'button', { name: 'Remove Chocolate' } ) );
		expect( screen.queryByText( 'Chocolate' ) ).not.toBeInTheDocument();
		expect( screen.getByText( 'Vanilla' ) ).toBeInTheDocument();
	} );

	it( 'announces removal to screen readers', () => {
		const { container } = render(
			<FormAutocompleteMultiselect
				forLabel="my_inline_chips_a11y"
				label="Categories"
				options={ options }
				variant="inline-chips"
				showAllValues
				initialValue={ [ 'Chocolate', 'Vanilla' ] }
			/>
		);
		fireEvent.click( screen.getByRole( 'button', { name: 'Remove Chocolate' } ) );
		const statusEl = container.querySelector( '#vip-autocompletemultiselect-status' );
		expect( statusEl ).toHaveTextContent( 'Chocolate removed from the list.' );
	} );
} );

describe( '<FormAutocompleteMultiselect debounce />', () => {
	beforeEach( () => {
		jest.useFakeTimers();
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );

	// The inline callback matters: each parent render hands down a new function, which is
	// how consumers usually write it and what dropped the pending timer before the ref.
	const renderDebounced = ( onInputChange: jest.Mock ) => {
		const tree = () => (
			<FormAutocompleteMultiselect
				forLabel="debounced"
				label="Debounced"
				options={ options }
				debounce={ 300 }
				onInputChange={ query => {
					onInputChange( query );
				} }
			/>
		);
		const user = userEvent.setup( { advanceTimers: jest.advanceTimersByTime } );
		return { user, ...render( tree() ), tree };
	};

	it( 'reports only the latest query when keystrokes arrive across re-renders', async () => {
		const onInputChange = jest.fn();
		const { user, rerender, tree } = renderDebounced( onInputChange );

		await user.type( screen.getByLabelText( 'Debounced' ), 'c' );
		rerender( tree() );
		await user.type( screen.getByLabelText( 'Debounced' ), 'h' );
		expect( onInputChange ).not.toHaveBeenCalled();

		act( () => {
			jest.advanceTimersByTime( 300 );
		} );

		expect( onInputChange ).toHaveBeenCalledTimes( 1 );
		expect( onInputChange ).toHaveBeenCalledWith( 'ch' );
	} );

	it( 'drops a pending query when unmounted before the delay elapses', async () => {
		const onInputChange = jest.fn();
		const { user, unmount } = renderDebounced( onInputChange );

		await user.type( screen.getByLabelText( 'Debounced' ), 'c' );
		unmount();
		act( () => {
			jest.advanceTimersByTime( 300 );
		} );

		expect( onInputChange ).not.toHaveBeenCalled();
	} );
} );
