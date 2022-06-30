/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Select } from './Select';

describe( '<Select />', () => {
	it( 'renders the Select component with the specified placeholder', () => {
		render( <Select inputId={ 'search-select' } placeholder={ 'Search...' } /> );

		// Can't use `getByPlaceholderText` here since it's not actually being rendered as a placeholder element
		const placeholder = screen.getByText( 'Search...' );

		expect( placeholder ).toBeInTheDocument();
	} );

	it( 'renders the Select component with accessibility props', async () => {
		const { container } = render(
			<Select
				inputId={ 'search-select' }
				aria-label={ 'Search or select from the dropdown list' }
			/>
		);

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
