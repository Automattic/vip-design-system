/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Button } from './Button';

describe( '<Button />', () => {
	it( 'renders the Button component', async () => {
		const { container } = render( <Button>Button text</Button> );

		expect( screen.getByText( 'Button text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
