/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { FormSelect } from './FormSelect';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry Chocolate Vanilla Chocolate Vanilla' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const defaultProps = {
	label: 'This is a label',
	forLabel: 'my_desert_list',
	options,
};

describe( '<FormSelect />', () => {
	it( 'renders the FormSelect component', async () => {
		const { container } = render( <FormSelect id="my_desert_list" { ...defaultProps } /> );

		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
