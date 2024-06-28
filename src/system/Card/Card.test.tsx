/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Card } from './Card';

const defaultProps = {};

describe( '<Card />', () => {
	it( 'renders the Card component', async () => {
		const { container } = render( <Card { ...defaultProps }>This is a Card</Card> );

		expect( screen.getByText( 'This is a Card' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Card component with a different variant', async () => {
		const { container } = render( <Card variant="primary">Card text</Card> );

		expect( screen.getByText( 'Card text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Card component with a title', async () => {
		const { container } = render( <Card title="Card Header">Card text</Card> );

		expect( screen.getByText( 'Card Header' ) ).toBeInTheDocument();

		expect( screen.getByText( 'Card text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
