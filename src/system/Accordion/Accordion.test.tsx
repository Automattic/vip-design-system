/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import * as Accordion from './Accordion';
import { theme } from '../';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

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
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'should open the content when clicking on its trigger', async () => {
		const user = userEvent.setup();

		const { container } = renderComponent();

		await user.click( screen.getByRole( 'button', { name: 'trigger two', expanded: false } ) );

		expect(
			screen.getByRole( 'button', { name: 'trigger one', expanded: false } )
		).toHaveAttribute( 'data-state', 'closed' );
		expect( screen.queryByText( 'content one' ) ).not.toBeInTheDocument();

		// Should find the open content
		expect( screen.getByRole( 'button', { name: 'trigger two', expanded: true } ) ).toHaveAttribute(
			'data-state',
			'open'
		);
		expect( screen.getByText( 'content two' ) ).toBeVisible();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
