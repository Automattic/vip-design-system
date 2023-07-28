/**
 * External dependencies
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Code } from './Code';

const defaultProps = {
	showCopy: false,
};

// Mock navigator.clipboard because jsdom doesn't support it
Object.defineProperty( window.navigator, 'clipboard', {
	value: {
		writeText: () => {},
	},
} );

describe( '<Code />', () => {
	it( 'renders the Code component', async () => {
		const { container } = render( <Code { ...defaultProps }>This is a code</Code> );

		expect( screen.getByText( 'This is a code' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Code component with a copy button', async () => {
		const props = { ...defaultProps, showCopy: true };
		const { container } = render( <Code { ...props }>This is a code</Code> );

		expect( screen.getByRole( 'button', { name: 'Copy code' } ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'updates the the UI after clicking on "Copy"', async () => {
		const props = { ...defaultProps, showCopy: true };
		const { container } = render( <Code { ...props }>This is a code</Code> );

		fireEvent.click( screen.getByRole( 'button', { name: 'Copy code' } ) );

		await waitFor( () => new Promise( resolve => setTimeout( resolve, 0 ) ) );

		expect( screen.getByText( 'Code copied to clipboard' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
