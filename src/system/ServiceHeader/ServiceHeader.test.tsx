/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { ServiceHeader } from './ServiceHeader';
import { Button } from '../Button/Button';
import * as Dropdown from '../Dropdown';

beforeAll( () => {
	if ( ! global.ResizeObserver ) {
		global.ResizeObserver = class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		} as typeof ResizeObserver;
	}
} );

describe( '<ServiceHeader />', () => {
	it( 'renders the service, its status badge, and the actions', async () => {
		const { container } = render(
			<ServiceHeader
				title="Performance Monitoring"
				description="This service monitors your application environment."
				status="enabled"
				actions={ <button>Enable</button> }
			/>
		);

		expect( screen.getByRole( 'heading', { name: 'Performance Monitoring' } ) ).toBeInTheDocument();
		expect(
			screen.getByText( 'This service monitors your application environment.' )
		).toBeInTheDocument();
		// Every service reads the same way: a running service is "Enabled".
		expect( screen.getByText( 'Enabled' ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Enable' } ) ).toBeInTheDocument();
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'labels the section with the service name', () => {
		render(
			<ServiceHeader title="Performance Monitoring" description="Monitoring." status="disabled" />
		);

		expect( screen.getByRole( 'region', { name: 'Performance Monitoring' } ) ).toBeInTheDocument();
		expect( screen.getByText( 'Disabled' ) ).toBeInTheDocument();
	} );

	it( 'spins the badge itself while the service is in transition', () => {
		const { container, rerender } = render(
			<ServiceHeader title="Performance Monitoring" description="Monitoring." status="enabled" />
		);

		expect( container.querySelector( '.vip-spinner-component' ) ).toBeNull();

		rerender(
			<ServiceHeader title="Performance Monitoring" description="Monitoring." status="enabling" />
		);

		const badge = container.querySelector( '.vip-badge-component' );
		expect( badge ).toHaveTextContent( 'Enabling' );
		expect( badge?.querySelector( '.vip-spinner-component' ) ).not.toBeNull();
	} );

	it( 'shows the helper message only when there is one', () => {
		const { rerender } = render(
			<ServiceHeader title="Performance Monitoring" description="Monitoring." status="disabled" />
		);

		expect( screen.queryByText( 'Non-production environments only.' ) ).not.toBeInTheDocument();

		rerender(
			<ServiceHeader
				title="Performance Monitoring"
				description="Monitoring."
				status="disabled"
				message="Non-production environments only."
			/>
		);

		expect( screen.getByText( 'Non-production environments only.' ) ).toBeInTheDocument();
	} );

	it( 'opens a menu placed alongside the lifecycle button in the actions slot', async () => {
		render(
			<ServiceHeader
				title="Performance Monitoring"
				description="Monitoring."
				status="enabled"
				actions={
					<>
						<Button variant="primary">Open</Button>
						<Dropdown.Root
							modal={ false }
							trigger={ <Button variant="secondary" aria-label="More actions" /> }
						>
							<Dropdown.Item>Disable service</Dropdown.Item>
						</Dropdown.Root>
					</>
				}
			/>
		);

		expect( screen.getByRole( 'button', { name: 'Open' } ) ).toBeInTheDocument();
		expect( screen.queryByRole( 'menuitem' ) ).not.toBeInTheDocument();

		await userEvent.click( screen.getByRole( 'button', { name: 'More actions' } ) );

		// The menu is portaled, so the header's `overflow: hidden` never clips it.
		expect(
			await screen.findByRole( 'menuitem', { name: 'Disable service' } )
		).toBeInTheDocument();
	} );
} );
