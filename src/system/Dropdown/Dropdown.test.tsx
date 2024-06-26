/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

/**
 * Internal dependencies
 */
import * as Dropdown from '.';

const defaultProps = {
	trigger: <button>Trigger</button>,
};

const getButton = () => screen.getByRole( 'button', { name: 'Trigger' } );

describe( '<Dropdown />', () => {
	it( 'renders the Dropdown component', async () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps }>
				<Dropdown.Item>My Item</Dropdown.Item>
			</Dropdown.Root>
		);

		expect( getButton() ).toBeInTheDocument();

		fireEvent.click( getButton() );

		// Check for accessibility issues
		await expect( axe( container ) ).resolves.toHaveNoViolations();
	} );
} );
