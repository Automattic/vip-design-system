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
import { restoreFocusOnlyForKeyboard } from './Dropdown';

const defaultProps = {
	trigger: <button>Trigger</button>,
};

const getButton = () => screen.getByRole( 'button', { name: 'Trigger' } );

beforeAll( () => {
	if ( ! global.ResizeObserver ) {
		global.ResizeObserver = class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as typeof ResizeObserver;
	}
} );

describe( '<Dropdown />', () => {
	it( 'renders the Dropdown component', async () => {
		const { container } = render(
			<Dropdown.Root { ...defaultProps }>
				<Dropdown.Item>My Item</Dropdown.Item>
			</Dropdown.Root>
		);

		expect( getButton() ).toBeInTheDocument();

		// Radix dropdowns open on pointer down rather than click.
		fireEvent.pointerDown( getButton() );

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

	describe( 'focus restoration on close', () => {
		// The decision is asserted directly rather than end to end: jsdom does not
		// reproduce Radix's focus restoration faithfully enough for the rendered
		// behaviour to be meaningful, and a test that passes because nothing
		// happened at all would be worse than none.
		it( 'suppresses restoration after a pointer interaction', () => {
			window.dispatchEvent( new Event( 'pointerdown' ) );
			const event = new Event( 'close' );
			const preventDefault = jest.spyOn( event, 'preventDefault' );

			restoreFocusOnlyForKeyboard( event );

			expect( preventDefault ).toHaveBeenCalled();
		} );

		it( 'allows restoration after a keyboard interaction', () => {
			window.dispatchEvent( new Event( 'keydown' ) );
			const event = new Event( 'close' );
			const preventDefault = jest.spyOn( event, 'preventDefault' );

			restoreFocusOnlyForKeyboard( event );

			expect( preventDefault ).not.toHaveBeenCalled();
		} );
	} );
} );
