/**
 * External dependencies
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MdContentCopy } from 'react-icons/md';

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

	// jsdom currently doesn't support pseudo-elements with getComputedStyle
	it.skip( 'renders "$" in front of the code when in prompt mode', async () => {
		const props = { ...defaultProps, prompt: true };
		const { container } = render( <Code { ...props }>This is a code</Code> );
		const codeElement = screen.getByText( 'This is a code' );

		expect( window.getComputedStyle( codeElement, ':before' ).content ).toEqual( '$' );

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Code component with a copy button', async () => {
		const props = { ...defaultProps, showCopy: true };
		const { container } = render( <Code { ...props }>This is a code</Code> );

		expect( screen.getByRole( 'button', { name: 'Copy' } ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'updates the the UI after clicking on "Copy"', async () => {
		const props = { ...defaultProps, showCopy: true };
		const { container } = render( <Code { ...props }>This is a code</Code> );

		fireEvent.click( screen.getByRole( 'button', { name: 'Copy' } ) );

		await waitFor( () => new Promise( res => setTimeout( res, 0 ) ) );

		expect( screen.getByText( 'Copied!' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
