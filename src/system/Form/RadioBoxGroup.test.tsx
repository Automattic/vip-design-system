/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { RadioBoxGroup } from './RadioBoxGroup';

const defaultProps = {
	options: [
		{
			label: 'One',
			value: 'one',
			description: 'This is desc 1',
		},
		{
			label: 'Two',
			value: 'two',
			description: 'This is desc 2',
		},
		{
			label: 'Three',
			value: 'three',
			description: 'This is desc 3',
		},
	],
	onChange: jest.fn(),
};

describe( '<RadioBoxGroup />', () => {
	it( 'renders the component', async () => {
		const { container } = render( <RadioBoxGroup { ...defaultProps } /> );

		const dom = await screen.findAllByRole( 'radio' );

		expect( dom ).toHaveLength( 3 );
		expect( dom[ 0 ] ).toHaveAttribute( 'value', 'one' );
		expect( dom[ 1 ] ).toHaveAttribute( 'value', 'two' );
		expect( dom[ 2 ] ).toHaveAttribute( 'value', 'three' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
