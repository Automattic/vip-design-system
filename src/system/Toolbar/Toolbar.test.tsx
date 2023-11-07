// TODO: Fix this
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Toolbar, Nav, NavItem, Text, theme } from '../../system';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Toolbar.Primary>
			<Toolbar.Logo href="https://wpvip.com/" />
			<Nav.Toolbar label="Main links">
				<NavItem.Toolbar active href="https://googles.com">
					My Applications
				</NavItem.Toolbar>
				<NavItem.Toolbar href="https://google.com">My Organization</NavItem.Toolbar>
			</Nav.Toolbar>

			<Toolbar.UtilNav>
				<Text>Utility content</Text>
			</Toolbar.UtilNav>
		</Toolbar.Primary>
	);

describe( '<Toolbar />', () => {
	it( 'renders the Toolbar component', async () => {
		const { container } = renderComponent();

		// Should find the toolbar main nav label
		expect( screen.getByLabelText( 'Main links' ) ).toBeInTheDocument();

		// Should find all links
		expect( screen.queryByText( 'My Applications' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'My Organization' ) ).toBeInTheDocument();

		// Renders utility nav
		expect( screen.getByLabelText( 'Utility' ) ).toBeInTheDocument();

		// Renders utility content
		expect( screen.queryByText( 'Utility content' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
