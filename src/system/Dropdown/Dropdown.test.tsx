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

beforeAll( () => {
	global.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	} as typeof ResizeObserver;
} );

describe( '<Dropdown />', () => {
	it( 'renders the Dropdown component', async () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps }>
				<Dropdown.Item>My Item</Dropdown.Item>
			</Dropdown.Root>
		);

		expect( getButton() ).toBeInTheDocument();

		fireEvent.pointerDown( getButton(), { button: 0, ctrlKey: false } );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'accepts content and label props with custom sx', async () => {
		render(
			<Dropdown.Root
				{ ...defaultProps }
				open
				contentProps={ {
					align: 'start',
					sideOffset: 5,
					sx: { minWidth: 280 },
				} }
			>
				<Dropdown.Label sx={ { color: 'heading' } }>Integrations</Dropdown.Label>
				<Dropdown.Item>Add integration</Dropdown.Item>
			</Dropdown.Root>
		);

		const label = await screen.findByText( 'Integrations' );
		const content = document.querySelector( '.vip-dropdown-menu-content' );

		expect( label ).toHaveClass( 'vip-dropdown-menu-label' );
		expect( content ).toBeInTheDocument();
		expect( content ).toHaveClass( 'vip-dropdown-menu-content' );
	} );
} );
