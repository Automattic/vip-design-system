/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Snackbar } from './Snackbar';
import { theme } from '../';

jest.mock( '@theme-ui/match-media' );

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

describe( '<Snackbar />', () => {
	it( 'renders the basic Snackbar component', async () => {
		const { container } = renderWithTheme( <Snackbar title="Test Title">Test content</Snackbar> );

		// Check for title and content
		expect( screen.getByText( 'Test Title' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Test content' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders different variants correctly', () => {
		const variants = [ 'error', 'info', 'success', 'system', 'warning' ] as const;

		variants.forEach( variant => {
			const { container } = renderWithTheme(
				<Snackbar variant={ variant } title={ `${ variant } title` }>
					{ `${ variant } content` }
				</Snackbar>
			);

			expect( screen.getByText( `${ variant } title` ) ).toBeInTheDocument();
			expect( screen.getByText( `${ variant } content` ) ).toBeInTheDocument();
			expect( container.querySelector( '.vip-snackbar-component' ) ).toBeInTheDocument();
		} );
	} );

	it( 'renders with loading state', () => {
		const { container } = renderWithTheme( <Snackbar loading>Loading content</Snackbar> );

		expect( screen.getByText( 'Loading content' ) ).toBeInTheDocument();
		expect( container.querySelector( '.vip-spinner-component' ) ).toBeInTheDocument();
	} );

	it( 'handles CTA click correctly', async () => {
		const mockOnClick = jest.fn();
		const user = userEvent.setup();

		renderWithTheme(
			<Snackbar ctaText="Click me" ctaOnClick={ mockOnClick }>
				Content with CTA
			</Snackbar>
		);

		const ctaButton = screen.getByText( 'Click me' );
		await user.click( ctaButton );

		expect( mockOnClick ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'renders CTA with href correctly', () => {
		renderWithTheme(
			<Snackbar ctaText="Visit Link" ctaHref="https://example.com">
				Content with link
			</Snackbar>
		);

		const link = screen.getByText( 'Visit Link' );
		expect( link ).toHaveAttribute( 'href', 'https://example.com' );
	} );

	it( 'applies custom className and styles', () => {
		const { container } = renderWithTheme(
			<Snackbar className="custom-class" sx={ { backgroundColor: 'red' } } title="Styled Snackbar">
				Styled content
			</Snackbar>
		);

		const snackbarElement = container.querySelector( '.vip-snackbar-component' );
		expect( snackbarElement ).toHaveClass( 'custom-class' );
	} );
} );
