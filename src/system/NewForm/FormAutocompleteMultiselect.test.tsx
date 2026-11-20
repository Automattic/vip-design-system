/**
 * External dependencies
 */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { FormAutocomplete } from './FormAutocomplete';
import { FormAutocompleteMultiselect } from './FormAutocompleteMultiselect';

type MultiselectProps = Partial< React.ComponentProps< typeof FormAutocompleteMultiselect > >;

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

describe( '<FormAutocompleteMultiselect /> aria-activedescendant', () => {
	const ATTRIBUTE = 'aria-activedescendant';

	const instances = ( count: number, props: MultiselectProps = {} ) =>
		Array.from( { length: count }, ( _, index ) => (
			<FormAutocompleteMultiselect
				key={ index }
				{ ...defaultProps }
				forLabel={ `dessert-${ index }` }
				label={ `Dessert ${ index }` }
				{ ...props }
			/>
		) );

	const single = (
		<FormAutocomplete key="single" { ...defaultProps } forLabel="single" label="Single" />
	);

	const getInputs = ( container: HTMLElement ) =>
		Array.from( container.querySelectorAll( 'input.autocomplete__input' ) );

	const expectAbsent = ( inputs: Element[] ) =>
		waitFor( () => {
			inputs.forEach( input => expect( input ).not.toHaveAttribute( ATTRIBUTE ) );
		} );

	// Stands in for the vendor autocomplete re-rendering its input.
	const write = ( input: Element, value: string ) => {
		act( () => input.setAttribute( ATTRIBUTE, value ) );
	};

	// The vendor autocomplete reads the legacy `keyCode`, which user-event leaves at 0.
	const pressKey = ( key: string, keyCode: number ) => {
		fireEvent.keyDown( document.activeElement as Element, { key, keyCode } );
	};

	const highlightFirstOption = async ( user: UserEvent, input: Element ) => {
		await user.click( input );
		await screen.findByRole( 'option', { name: 'Chocolate' } );
		pressKey( 'ArrowDown', 40 );
	};

	const variants: [ string, MultiselectProps ][] = [
		[ 'default with a selection', { initialValue: [ 'Chocolate' ] } ],
		[ 'inline-chips with a selection', { variant: 'inline-chips', initialValue: [ 'Chocolate' ] } ],
	];

	it.each( variants )( 'is absent on two idle %s instances', async ( _case, props ) => {
		const { container } = render( <>{ instances( 2, props ) }</> );
		const inputs = getInputs( container );

		expect( inputs ).toHaveLength( 2 );
		await expectAbsent( inputs );
	} );

	it( 'is absent after the variant changes', async () => {
		const { container, rerender } = render( <>{ instances( 2 ) }</> );

		rerender( <>{ instances( 2, { variant: 'inline-chips' } ) }</> );

		const inputs = getInputs( container );

		expect( inputs ).toHaveLength( 2 );
		await expectAbsent( inputs );
	} );

	it( 'is absent and stays absent with a single-select before a multiselect', async () => {
		const { container } = render(
			<>
				{ single }
				{ instances( 1 ) }
			</>
		);
		const inputs = getInputs( container );

		expect( inputs ).toHaveLength( 2 );
		await expectAbsent( inputs );

		write( inputs[ 1 ], 'false' );

		await expectAbsent( [ inputs[ 1 ] ] );
	} );

	it( 'passes the axe ARIA value check with two idle instances', async () => {
		const { container } = render( <>{ instances( 2 ) }</> );

		expect(
			await axe( container, {
				runOnly: { type: 'rule', values: [ 'aria-valid-attr-value' ] },
			} )
		).toHaveNoViolations();
	} );

	it( 'points at the highlighted option of its own instance only', async () => {
		const user = userEvent.setup();
		const { container } = render( <>{ instances( 2, { showAllValues: true } ) }</> );
		const [ first, second ] = getInputs( container );

		await highlightFirstOption( user, second );

		const highlighted = container.querySelector( '.autocomplete__option--focused' );
		const activeId = second.getAttribute( ATTRIBUTE );

		expect( activeId ).toBeTruthy();
		expect( activeId ).not.toBe( 'false' );
		expect( activeId ).toBe( highlighted?.id );
		expect( document.getElementById( activeId as string ) ).toBe( highlighted );
		expect( first ).not.toHaveAttribute( ATTRIBUTE );
	} );

	it.each< [ string, ( user: UserEvent ) => void | Promise< void > ] >( [
		[ 'the menu is closed with Escape', () => pressKey( 'Escape', 27 ) ],
		[ 'focus moves away', async user => user.tab() ],
	] )( 'is removed once %s after a highlight', async ( _case, leave ) => {
		const user = userEvent.setup();
		const { container } = render( <>{ instances( 2, { showAllValues: true } ) }</> );
		const second = getInputs( container )[ 1 ];

		await highlightFirstOption( user, second );
		expect( second ).toHaveAttribute( ATTRIBUTE, expect.stringContaining( '__option--' ) );

		await leave( user );

		await expectAbsent( [ second ] );
	} );
} );
