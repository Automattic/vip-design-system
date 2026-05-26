/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
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
		await expect( await axe( container ) ).toHaveNoViolations();
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
