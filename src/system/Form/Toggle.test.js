/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Toggle } from './Toggle';

describe( '<Toggle />', () => {
	it( 'renders the Toggle component', async () => {
		const { container } = render(
			<Toggle aria-label="Dinner room Light" defaultChecked name="my-toggle" />
		);

		expect( screen.getByRole( 'switch' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
