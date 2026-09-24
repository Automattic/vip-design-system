/**
 * External dependencies
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { FormAutocomplete } from './FormAutocomplete';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry Chocolate Vanilla Chocolate Vanilla' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const defaultProps = {
	label: 'This is a label',
	options,
};

describe( '<FormAutocomplete />', () => {
	it( 'renders the FormAutocomplete component', async () => {
		const { container } = render(
			<FormAutocomplete forLabel="my_desert_list" label="This is a label" />
		);

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the FormAutocomplete component with options', async () => {
		const { container } = render(
			<FormAutocomplete forLabel="my_desert_list" { ...defaultProps } />
		);

		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'forwards input attributes', () => {
		render(
			<FormAutocomplete
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

	describe( 'onInputChange', () => {
		const setup = async ( props = {}, userOptions ) => {
			const onInputChange = jest.fn();
			const user = userEvent.setup( userOptions );

			render(
				<FormAutocomplete
					{ ...defaultProps }
					forLabel="dessert"
					onInputChange={ onInputChange }
					{ ...props }
				/>
			);

			const input = screen.getByLabelText( defaultProps.label );
			await user.click( input );

			return { input, onInputChange, user };
		};

		it.each( [
			[
				'backspacing the last character',
				async ( user, input ) => user.type( input, '{Backspace}' ),
			],
			[ 'selecting all and deleting', async ( user, input ) => user.clear( input ) ],
		] )( 'reports an empty query when the input is cleared by %s', async ( _case, clear ) => {
			const { input, onInputChange, user } = await setup();

			await user.type( input, 'C' );
			expect( onInputChange ).toHaveBeenLastCalledWith( 'C' );

			await clear( user, input );

			expect( onInputChange ).toHaveBeenLastCalledWith( '' );
		} );

		// `showAllValues` makes the vendor call `source` for every query, so it is the config
		// where a second `onInputChange` call could sneak back in.
		it.each( [
			[ 'an overlay menu', {} ],
			[ 'showAllValues', { showAllValues: true } ],
		] )( 'reports each typed character exactly once with %s', async ( _case, props ) => {
			const { input, onInputChange, user } = await setup( props );

			await user.type( input, 'Cho' );

			expect( onInputChange.mock.calls ).toEqual( [ [ 'C' ], [ 'Ch' ], [ 'Cho' ] ] );
		} );

		// Two instances rendered without an explicit id share the `forLabel` default, so a
		// document-wide lookup would bind both listeners to whichever input comes first.
		it( 'reports edits to the instance that owns the input', async () => {
			const user = userEvent.setup();
			const first = jest.fn();
			const second = jest.fn();

			const { container } = render(
				<>
					<FormAutocomplete { ...defaultProps } label="First" onInputChange={ first } />
					<FormAutocomplete { ...defaultProps } label="Second" onInputChange={ second } />
				</>
			);

			const [ firstInput, secondInput ] = container.querySelectorAll( 'input.autocomplete__input' );

			await user.type( firstInput, 'C' );

			expect( first ).toHaveBeenCalledWith( 'C' );
			expect( second ).not.toHaveBeenCalled();

			await user.type( secondInput, 'V' );

			expect( second ).toHaveBeenCalledWith( 'V' );
			expect( first ).toHaveBeenCalledTimes( 1 );
		} );

		// A synchronous call here re-enters React from inside the native `input` listener. In a
		// real browser the consumer's setState then flushes in a microtask before the vendor
		// autocomplete's own handler runs, which writes its stale query back into the controlled
		// input
		it.each( [
			[ 'a typed character', 'C' ],
			[ 'an empty query', '' ],
		] )( 'defers %s out of the native input listener', async ( _case, query ) => {
			jest.useFakeTimers();

			try {
				const { input, onInputChange } = await setup(
					{},
					{
						advanceTimers: jest.advanceTimersByTime,
					}
				);

				fireEvent.input( input, { target: { value: query } } );

				expect( onInputChange ).not.toHaveBeenCalled();

				act( () => jest.advanceTimersByTime( 0 ) );

				expect( onInputChange.mock.calls ).toEqual( [ [ query ] ] );
			} finally {
				jest.useRealTimers();
			}
		} );

		it( 'coalesces rapid undebounced edits into the latest value', async () => {
			jest.useFakeTimers();

			try {
				const { input, onInputChange } = await setup(
					{},
					{
						advanceTimers: jest.advanceTimersByTime,
					}
				);

				fireEvent.input( input, { target: { value: 'C' } } );
				fireEvent.input( input, { target: { value: 'Ch' } } );
				fireEvent.input( input, { target: { value: 'Cho' } } );

				act( () => jest.advanceTimersByTime( 0 ) );

				expect( onInputChange.mock.calls ).toEqual( [ [ 'Cho' ] ] );
			} finally {
				jest.useRealTimers();
			}
		} );

		it( 'drops a pending call when the component unmounts', async () => {
			jest.useFakeTimers();

			try {
				const onInputChange = jest.fn();

				const { unmount } = render(
					<FormAutocomplete
						{ ...defaultProps }
						forLabel="dessert"
						onInputChange={ onInputChange }
					/>
				);

				fireEvent.input( screen.getByLabelText( defaultProps.label ), {
					target: { value: 'Cho' },
				} );
				unmount();

				act( () => jest.advanceTimersByTime( 0 ) );

				expect( onInputChange ).not.toHaveBeenCalled();
			} finally {
				jest.useRealTimers();
			}
		} );

		it( 'reports the empty query after the debounce elapses', async () => {
			jest.useFakeTimers();

			try {
				const { input, onInputChange, user } = await setup(
					{ debounce: 300, minLength: 2 },
					{ advanceTimers: jest.advanceTimersByTime }
				);

				await user.type( input, 'Cho' );
				act( () => jest.advanceTimersByTime( 300 ) );
				expect( onInputChange ).toHaveBeenLastCalledWith( 'Cho' );

				await user.clear( input );
				expect( onInputChange ).toHaveBeenCalledTimes( 1 );

				act( () => jest.advanceTimersByTime( 300 ) );

				expect( onInputChange ).toHaveBeenLastCalledWith( '' );
			} finally {
				jest.useRealTimers();
			}
		} );
	} );

	describe( 'resetOnBlur', () => {
		// The blur event is dispatched on its own so the assertions cover this component's
		// own blur listener rather than the vendor autocomplete's focusout handling.
		const blur = async input => {
			await act( async () => {
				fireEvent.blur( input );
			} );
		};

		const setup = async valueProps => {
			const onChange = jest.fn();
			const user = userEvent.setup();

			render(
				<FormAutocomplete
					{ ...defaultProps }
					forLabel="dessert"
					resetOnBlur
					showAllValues
					onChange={ onChange }
					{ ...valueProps }
				/>
			);

			const input = screen.getByLabelText( defaultProps.label );

			await user.click( input );
			await user.click( await screen.findByRole( 'option', { name: 'Chocolate' } ) );

			return { input, onChange, user };
		};

		const valueVariants = [
			[ 'without a value prop', {} ],
			[ 'with an undefined value', { value: undefined } ],
			[ 'with an empty string value', { value: '' } ],
		];

		it.each( valueVariants )(
			'keeps the confirmed selection across blurs %s',
			async ( _case, valueProps ) => {
				const { input, onChange, user } = await setup( valueProps );

				await blur( input );

				expect( input ).toHaveValue( 'Chocolate' );

				await user.click( input );
				await blur( input );

				expect( input ).toHaveValue( 'Chocolate' );
				expect( onChange ).toHaveBeenCalledTimes( 1 );
				expect( onChange ).toHaveBeenLastCalledWith( options[ 0 ], 'Chocolate' );
			}
		);

		it.each( valueVariants )(
			'restores a partially typed query to the confirmed selection on blur %s',
			async ( _case, valueProps ) => {
				const { input, onChange, user } = await setup( valueProps );

				await user.clear( input );
				await user.keyboard( 'Vanil' );
				await blur( input );

				expect( input ).toHaveValue( 'Chocolate' );
				expect( onChange ).toHaveBeenLastCalledWith( options[ 0 ], 'Chocolate' );
			}
		);
	} );
} );
