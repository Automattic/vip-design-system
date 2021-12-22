/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Avatar } from './Avatar';

describe( '<Avatar />', () => {
	it( 'renders the Avatar without an image', async () => {
		const { container } = render( <Avatar name="John Doe" /> );

		expect( screen.getByText( 'J' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Avatar with image', async () => {
		const { container } = render( <Avatar name="John Doe" src="path/to/image" /> );

		expect( screen.getByAltText( 'Avatar image from John Doe' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
