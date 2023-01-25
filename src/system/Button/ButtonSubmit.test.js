/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { ButtonSubmit } from './ButtonSubmit';

const defaultProps = {
	label: 'Load more items',
};

describe( '<ButtonSubmit />', () => {
	it( 'renders the ButtonSubmit component', async () => {
		const { container } = render( <ButtonSubmit { ...defaultProps } /> );

		expect( screen.getByRole( 'button', { label: 'Load more items' } ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the ButtonSubmit loading', async () => {
		render( <ButtonSubmit { ...defaultProps } loading={ true } /> );
		const button = screen.getByRole( 'button', { label: 'Load more items' } );

		// Button
		expect( button ).toHaveAttribute( 'aria-disabled', 'true' );

		// Spinner
		expect( screen.getByTitle( 'Loading...' ) ).toBeInTheDocument();
	} );
} );
