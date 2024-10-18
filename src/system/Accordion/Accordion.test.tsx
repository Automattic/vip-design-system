/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { useState } from 'react';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import * as Accordion from './Accordion';
import { Button, theme } from '../';

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

const renderUncontrolledComponent = () =>
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

const renderControlledComponent = () => {
	const ControlledComponent = () => {
		const [ value, setValue ] = useState( 'one' );

		return (
			<Accordion.Root value={ value } onValueChange={ setValue }>
				<Accordion.Item value="one">
					<Button
						aria-controls="manage-content-one"
						aria-expanded={ value === 'one' ? 'true' : 'false' }
						data-state={ value === 'one' ? 'open' : 'closed' }
						onClick={ () => {
							if ( value === 'one' ) {
								setValue( '' );
							} else {
								setValue( 'one' );
							}
						} }
					>
						trigger one
					</Button>
					<Accordion.Content id="manage-content-one">content one</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item value="two">
					<Button
						aria-controls="manage-content-two"
						aria-expanded={ value === 'two' ? 'true' : 'false' }
						data-state={ value === 'two' ? 'open' : 'closed' }
						onClick={ () => {
							if ( value === 'two' ) {
								setValue( '' );
							} else {
								setValue( 'two' );
							}
						} }
					>
						trigger two
					</Button>
					<Accordion.Content id="manage-content-two">content two</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		);
	};

	return renderWithTheme( <ControlledComponent /> );
};

describe.each( [
	[ 'Uncontrolled', renderUncontrolledComponent ],
	[ 'Controlled', renderControlledComponent ],
] )( '<Accordion />, %s', ( ...modeAndComponent ) => {
	const [ , renderComponent ] = modeAndComponent;
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
