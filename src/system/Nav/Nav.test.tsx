/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Nav, NavItem } from '.';
import { theme } from '../';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Nav.Primary variant="primary" label="Main">
			<NavItem.Primary href="#">PHP</NavItem.Primary>
			<NavItem.Primary href="https://wordpress.com">WordPress</NavItem.Primary>
			<NavItem.Primary active href="https://newrelic.com/">
				New Relic
			</NavItem.Primary>
			<NavItem.Primary disabled href="https://google.com/">
				Not accessible
			</NavItem.Primary>
		</Nav.Primary>
	);

describe( '<Nav />', () => {
	it( 'renders the Nav component with default value visible', async () => {
		const { container } = renderComponent();

		// Should find the nav label
		expect( screen.getByLabelText( 'Main' ) ).toBeInTheDocument();

		// Should find all links
		expect( screen.queryByText( 'PHP' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'WordPress' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'New Relic' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'Not accessible' ) ).toHaveAttribute( 'aria-disabled', 'true' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
