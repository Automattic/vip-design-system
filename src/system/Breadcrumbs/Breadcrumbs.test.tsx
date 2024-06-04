/** @jsxImportSource theme-ui */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

import { Breadcrumbs } from './Breadcrumbs';
import { theme } from '../';

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
} );
