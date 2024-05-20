/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchMedia from '@theme-ui/match-media';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Breadcrumbs } from './Breadcrumbs';
import { theme } from '../';

jest.mock( '@theme-ui/match-media' );
const mockBreakpointIndex = matchMedia.useBreakpointIndex;

// eslint-disable-next-line jsx-a11y/anchor-has-content
const CustomLink = props => <a { ...props } />;

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Breadcrumbs
			label="Main Breadcrumb"
			LinkComponent={ CustomLink }
			links={ [
				{ label: 'Home', href: '/' },
				{ label: 'Applications', href: '/apps' },
				{ label: 'Application Name' },
			] }
		/>
	);

describe( '<Breadcrumbs />', () => {
	beforeAll( () => {
		Object.defineProperty( window, 'matchMedia', {
			value: jest.fn( () => {
				return {
					matches: true,
					addListener: jest.fn(),
					removeListener: jest.fn(),
				};
			} ),
		} );
	} );

	it( 'renders the Breadcrumbs component', async () => {
		const { container } = renderComponent();

		// Should find the nav label
		expect( screen.getByLabelText( 'Main Breadcrumb' ) ).toBeInTheDocument();

		// Should find all links
		expect( screen.getByText( 'Home' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Applications' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Application Name' ) ).toHaveAttribute( 'aria-current', 'page' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	describe( 'wrapMode tests', () => {
		beforeEach( () => {
			mockBreakpointIndex.mockReset();
		} );

		it( 'expands the breadcrumb items when clicking in the collapsible link', async () => {
			mockBreakpointIndex.mockReturnValue( 0 );

			const links = [
				{ label: 'Home', href: '/' },
				{ label: 'Applications', href: '/apps' },
				{ label: 'Applications 3', href: '/apps/3' },
				{ label: 'Applications 4', href: '/apps/4' },
				{ label: 'The last' },
			];

			const user = userEvent.setup();

			const { container } = renderWithTheme(
				<Breadcrumbs
					wrapMode="collapsible"
					label="Main Collapsible Breadcrumb"
					LinkComponent={ CustomLink }
					links={ links }
				/>
			);

			// Should find the nav label
			const navEl = screen.getByLabelText( 'Main Collapsible Breadcrumb' );

			expect( navEl ).toBeInTheDocument();

			// Contract should have
			expect( navEl.querySelectorAll( 'li' ) ).toHaveLength( 3 );

			const pressToShowButton = screen.getByRole( 'button', {
				name: 'Press to show more breadcrumbs',
			} );

			// Should find all links
			expect( screen.getByText( 'Home' ) ).toBeInTheDocument();
			expect( pressToShowButton ).toBeInTheDocument();
			expect( screen.getByText( 'The last' ) ).toHaveAttribute( 'aria-current', 'page' );

			// Click to expand the breadcrumbs
			await user.click( pressToShowButton );

			expect( navEl.querySelectorAll( 'li' ) ).toHaveLength( 5 );

			// Check for accessibility issues
			expect( await axe( container ) ).toHaveNoViolations();
		} );
	} );
} );
