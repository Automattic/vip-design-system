/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { ResultsSummary } from './ResultsSummary';

describe( '<ResultsSummary />', () => {
	it( 'updates a mounted polite live region', async () => {
		const { container, rerender } = render( <ResultsSummary>Loading results…</ResultsSummary> );

		const summary = screen.getByText( 'Loading results…' );

		expect( summary ).toBeInstanceOf( HTMLParagraphElement );
		expect( summary ).toHaveAttribute( 'aria-live', 'polite' );
		expect( summary ).toHaveAttribute( 'aria-atomic', 'true' );

		rerender( <ResultsSummary>Showing 1–10 of 37 sandboxes</ResultsSummary> );

		expect( screen.getByText( 'Showing 1–10 of 37 sandboxes' ) ).toBe( summary );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'preserves polymorphic heading semantics', () => {
		render( <ResultsSummary as="h2">1 sandbox found</ResultsSummary> );

		expect( screen.getByRole( 'heading', { level: 2 } ) ).toHaveAttribute( 'aria-live', 'polite' );
	} );
} );
