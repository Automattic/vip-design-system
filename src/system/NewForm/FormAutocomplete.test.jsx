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
