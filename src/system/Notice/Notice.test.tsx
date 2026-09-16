/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Notice } from './Notice';

describe( '<Notice />', () => {
	it( 'accepts a rich title and native div attributes', async () => {
		const { container } = render(
			<Notice
				title={
					<span>
						Rich <strong>notice title</strong>
					</span>
				}
				data-testid="notice"
				role="status"
			>
				Notice content
			</Notice>
		);

		expect( screen.getByText( 'notice title' ) ).toBeInTheDocument();
		expect( screen.getByTestId( 'notice' ) ).toHaveAttribute( 'role', 'status' );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'has no close button unless it is dismissible', () => {
		render( <Notice title="Heads up">Notice content</Notice> );

		expect( screen.queryByRole( 'button', { name: 'Close notice' } ) ).not.toBeInTheDocument();
	} );

	it( 'hides itself and reports the dismissal when closed', async () => {
		const onDismiss = jest.fn();
		render(
			<Notice title="Heads up" dismissible onDismiss={ onDismiss }>
				Notice content
			</Notice>
		);

		await userEvent.click( screen.getByRole( 'button', { name: 'Close notice' } ) );

		expect( screen.queryByText( 'Notice content' ) ).not.toBeInTheDocument();
		expect( onDismiss ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'gives a collapsible notice one icon, the toggle', async () => {
		render(
			<Notice title="Heads up" collapsible>
				Notice content
			</Notice>
		);

		// Only the chevron, so there is no second icon to mistake it for.
		expect( screen.queryByRole( 'button', { name: 'Close notice' } ) ).not.toBeInTheDocument();

		await userEvent.click( screen.getByRole( 'button', { name: 'Heads up' } ) );
		expect( screen.getByText( 'Notice content' ) ).toBeInTheDocument();
	} );
} );
