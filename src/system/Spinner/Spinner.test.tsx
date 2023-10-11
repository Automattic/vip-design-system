/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Spinner } from './Spinner';

describe( '<Spinner />', () => {
	it( 'renders the Spinner component', async () => {
		const { container } = render( <Spinner /> );

		expect( container.getElementsByClassName( 'vip-spinner-component' ) ).toBeDefined();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Spinner component with a different title', async () => {
		const { container } = render( <Spinner title="Please Wait" /> );

		expect( screen.getByTitle( 'Please Wait' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
