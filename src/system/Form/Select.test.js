/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
  * Internal dependencies
  */
import { Select } from './Select';

const defaultProps = {};

describe( '<Select />', () => {
	it( 'renders the Select component with the specified placeholder', () => {
		render(
			<Select
				inputId={ 'async-search-select' }
				placeholder={ 'Search...' }
			/>
		);

		// Can't use `getByPlaceholderText` here since it's not actually being rendered as a placeholder element
		const placeholder = screen.getByText('Search...');

		expect( placeholder ).toBeInTheDocument();
	} );
} );
