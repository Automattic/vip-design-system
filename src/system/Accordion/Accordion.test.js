/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import * as Accordion from './Accordion';
import { theme } from '../';

const renderWithTheme = children =>
	render( <ThemeProvider theme={ theme }>{ children }</ThemeProvider> );

const renderComponent = () =>
	renderWithTheme(
		<Accordion.Root defaultValue="one" sx={ { width: '400px' } }>
			<Accordion.Item value="one">
				<Accordion.Trigger>trigger one</Accordion.Trigger>
				<Accordion.Content>content one</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="two">
				<Accordion.Trigger>trigger two</Accordion.Trigger>
				<Accordion.Content>content two</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);

describe( '<Accordion />', () => {
	it( 'renders the Accordion component with default value visible', async () => {
		const { container } = renderComponent();

		// Should find the open content
		expect( screen.getByText( 'content one' ) ).toBeInTheDocument();

		// Should not find the closed content
		expect( screen.queryByText( 'content two' ) ).toBeNull();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'should open the content when clicking on its trigger', async () => {
		const { container } = renderComponent();

		fireEvent.click( screen.getByRole( 'button', { name: 'trigger two' } ) );

		// Should find the open content
		expect( screen.queryByText( 'content one' ) ).toBeNull();

		// Should not find the closed content
		expect( screen.queryByText( 'content two' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
