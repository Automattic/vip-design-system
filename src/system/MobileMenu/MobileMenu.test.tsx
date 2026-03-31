/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxImportSource theme-ui */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { MobileMenuContent as MobileMenuExample } from './MobileMenu.stories';
import { theme } from '../';

// Mock getComputedStyle to avoid jsdom/nwsapi selector parse errors
// with Radix UI-generated IDs containing special characters.
const originalGetComputedStyle = window.getComputedStyle;
beforeAll( () => {
	window.getComputedStyle = ( element, pseudoElt ) => {
		try {
			return originalGetComputedStyle( element, pseudoElt );
		} catch {
			return {} as CSSStyleDeclaration;
		}
	};
} );
afterAll( () => {
	window.getComputedStyle = originalGetComputedStyle;
} );

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () => renderWithTheme( <MobileMenuExample /> );

function getMenuTrigger() {
	return screen.getByRole( 'button', { name: 'Menu' } );
}

describe( '<MobileMenu />', () => {
	it( 'renders the MobileMenu trigger', async () => {
		const { container } = renderComponent();

		// Should find the trigger
		expect( getMenuTrigger() ).toBeInTheDocument();

		expect( getMenuTrigger() ).toHaveAttribute( 'data-state', 'closed' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'opens MobileMenu and check for items', async () => {
		const user = userEvent.setup();

		const { container } = renderComponent();

		await user.click( getMenuTrigger() );

		// Should find the open content
		expect( screen.getByText( 'My Applications' ) ).toBeVisible(); // First menu
		expect( screen.getByText( 'My Organizations' ) ).toBeVisible();
		expect( screen.getByText( 'Performance' ) ).toBeVisible();
		expect( screen.getByText( 'Features' ) ).toBeVisible(); // Last Menu

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
