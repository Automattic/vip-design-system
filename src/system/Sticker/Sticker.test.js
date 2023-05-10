/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Sticker } from './Sticker';

describe( '<Sticker />', () => {
	it( 'renders the Sticker component', async () => {
		const { container } = render( <Sticker>Sticker text</Sticker> );

		expect( screen.getByText( 'Sticker text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Sticker component with a different variant', async () => {
		const { container } = render( <Sticker variant="primary">Sticker text</Sticker> );

		expect( screen.getByText( 'Sticker text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
