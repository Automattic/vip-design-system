/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
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
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
	it( 'renders the FormAutocompleteMultiselect component with options', async () => {
		const { container } = render(
			<FormAutocompleteMultiselect forLabel="my_desert_list" { ...defaultProps } />
		);
		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
