/**
 * External dependencies
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MdContentCopy } from 'react-icons/md';

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
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Card component with a different variant', async () => {
		const { container } = render( <Card variant="primary">Card text</Card> );

		expect( screen.getByText( 'Card text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
