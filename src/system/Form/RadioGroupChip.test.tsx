/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { RadioGroupChip } from './RadioGroupChip';

const defaultProps = {
	options: [
		{
			label: 'One',
			value: 'one',
		},
		{
			label: 'Two',
			value: 'two',
		},
		{
			label: 'Three',
			value: 'three',
		},
	],
	onChange: jest.fn(),
};

describe( '<RadioGroupChip />', () => {
	it( 'renders the default variant', async () => {
		const { container } = render( <RadioGroupChip { ...defaultProps } /> );

		const dom = await screen.findAllByRole( 'radio' );

		expect( dom ).toHaveLength( 3 );
		expect( dom[ 0 ] ).toHaveAttribute( 'value', 'one' );
		expect( dom[ 1 ] ).toHaveAttribute( 'value', 'two' );
		expect( dom[ 2 ] ).toHaveAttribute( 'value', 'three' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'forwards fieldset attributes and accepts custom sx', () => {
		const ref = createRef< HTMLFieldSetElement >();

		render(
			<RadioGroupChip
				{ ...defaultProps }
				ref={ ref }
				id="health-display-toggle"
				aria-label="Health display"
				optionWidth={ 120 }
				sx={ { mt: 2 } }
			/>
		);

		const fieldset = screen.getByRole( 'radiogroup', { name: 'Health display' } );

		expect( fieldset ).toHaveAttribute( 'id', 'health-display-toggle' );
		expect( ref.current ).toBe( fieldset );
	} );

	it( 'links the validation message even when no fieldset id is provided', () => {
		render(
			<RadioGroupChip
				{ ...defaultProps }
				aria-label="Plan size"
				hasError
				errorMessage="Choose a plan"
			/>
		);

		const fieldset = screen.getByRole( 'radiogroup', { name: 'Plan size' } );

		expect( fieldset ).toHaveAttribute( 'aria-describedby' );
		expect( screen.getByText( 'Choose a plan' ) ).toHaveAttribute(
			'id',
			fieldset.getAttribute( 'aria-describedby' )
		);
	} );
} );
