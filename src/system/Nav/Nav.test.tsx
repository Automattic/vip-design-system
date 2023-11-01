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
import * as Nav from './';

import { theme } from '../';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Nav.Root variant="primary" label="Main">
			<Nav.Item href="#">PHP</Nav.Item>
			<Nav.Item href="https://wordpress.com">WordPress</Nav.Item>
			<Nav.Item active href="htpps://newrelic.com/">
				New Relic
			</Nav.Item>
			<Nav.Item disabled href="https://google.com/">
				Not accessible
			</Nav.Item>
		</Nav.Root>
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
