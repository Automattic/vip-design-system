/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

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
} );
