/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Badge } from './Badge';

describe( '<Badge />', () => {
	it( 'renders the Badge component', async () => {
		const { container } = render( <Badge>Badge text</Badge> );

		expect( screen.getByText( 'Badge text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Badge component with a different variant', async () => {
		const { container } = render( <Badge variant="primary">Badge text</Badge> );

		expect( screen.getByText( 'Badge text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
