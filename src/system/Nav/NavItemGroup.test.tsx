/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Nav } from './Nav';
import { NavItem } from './NavItem';
import { theme } from '../';
import { CustomLink } from '../utils/stories/CustomLink';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Nav.Menu label="Nav Menu">
			<NavItem.MenuGroup active activeChildren label="Logs">
				<NavItem.Menu active as={ CustomLink } href="https://google.com/">
					Audit
				</NavItem.Menu>
				<NavItem.Menu as={ CustomLink } href="https://wpvip.com/">
					Runtime
				</NavItem.Menu>
				<NavItem.Menu as={ CustomLink } href="https://dashboard.wpvip.com/">
					Slow Query
				</NavItem.Menu>
			</NavItem.MenuGroup>
		</Nav.Menu>
	);

describe( '<NavItemGroup />', () => {
	it( 'renders the NavItemGroup component a data-active-children', async () => {
		const { container } = renderComponent();

		// Should find the button label
		const button = screen.getByRole( 'button', { label: /Logs/ } );

		expect( button ).toBeInTheDocument();

		// Expect to have another attribute
		expect( button ).toHaveAttribute( 'data-active', 'true' );
		expect( button ).toHaveAttribute( 'data-active-children', 'true' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
