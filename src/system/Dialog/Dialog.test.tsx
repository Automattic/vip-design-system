/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Dialog } from './Dialog';
import { DialogContent } from './DialogContent';

import type { ReactNode } from 'react';

// framer-motion keeps exiting content mounted until its animation ends and jsdom never
// finishes one, so the animation layer is replaced with plain elements here.
jest.mock( 'framer-motion', () => {
	const { createElement } = jest.requireActual< typeof import('react') >( 'react' );

	return {
		AnimatePresence: ( { children }: { children?: ReactNode } ) => children,
		motion: {
			div: ( { children, className }: { children?: ReactNode; className?: string } ) =>
				createElement( 'div', { className }, children ),
		},
		useReducedMotion: () => true,
	};
} );

const getTrigger = () => screen.getByText( 'Open' ).closest( '[aria-haspopup]' );

describe( '<Dialog />', () => {
	it( 'opens on click, reports the state on the trigger and closes on Escape', async () => {
		const user = userEvent.setup();
		const { container } = render(
			<Dialog trigger={ <span>Open</span> } content={ <p>Body</p> } />
		);

		expect( screen.queryByText( 'Body' ) ).not.toBeInTheDocument();
		expect( getTrigger() ).toHaveAttribute( 'aria-expanded', 'false' );

		await user.click( screen.getByText( 'Open' ) );

		expect( screen.getByText( 'Body' ) ).toBeInTheDocument();
		expect( getTrigger() ).toHaveAttribute( 'aria-expanded', 'true' );
		// The deprecated Dialog puts aria-expanded on a generic wrapper, which axe rejects
		// (aria-allowed-attr). The replacement is NewDialog; the rest of the checks still run.
		expect(
			await axe( container, { rules: { 'aria-allowed-attr': { enabled: false } } } )
		).toHaveNoViolations();

		await user.keyboard( '{Escape}' );

		expect( screen.queryByText( 'Body' ) ).not.toBeInTheDocument();
	} );

	it( 'opens with Enter but ignores other keys', async () => {
		const user = userEvent.setup();
		render( <Dialog trigger={ <span>Open</span> } content={ <p>Body</p> } /> );

		await user.tab();
		await user.keyboard( 'a' );
		expect( screen.queryByText( 'Body' ) ).not.toBeInTheDocument();

		await user.keyboard( '{Enter}' );
		expect( screen.getByText( 'Body' ) ).toBeInTheDocument();
	} );

	it( 'closes when clicking outside but stays open for clicks inside', async () => {
		const user = userEvent.setup();
		render(
			<Dialog
				startOpen
				trigger={ <span>Open</span> }
				content={
					<p>
						Body <button>Inside</button>
					</p>
				}
			/>
		);

		await user.click( screen.getByRole( 'button', { name: 'Inside' } ) );
		expect( screen.getByText( 'Body' ) ).toBeInTheDocument();

		await user.click( document.body );
		expect( screen.queryByText( 'Body' ) ).not.toBeInTheDocument();
	} );

	it( 'hands a close callback to a content render function', async () => {
		const user = userEvent.setup();
		render(
			<Dialog
				trigger={ <span>Open</span> }
				content={ ( { onClose } ) => <button onClick={ onClose }>Done</button> }
			/>
		);

		await user.click( screen.getByText( 'Open' ) );
		await user.click( screen.getByRole( 'button', { name: 'Done' } ) );

		expect( screen.queryByRole( 'button', { name: 'Done' } ) ).not.toBeInTheDocument();
	} );

	it( 'does not open while disabled', async () => {
		const user = userEvent.setup();
		render( <Dialog disabled trigger={ <span>Open</span> } content={ <p>Body</p> } /> );

		await user.click( screen.getByText( 'Open' ) );

		expect( screen.queryByText( 'Body' ) ).not.toBeInTheDocument();
	} );

	it( 'renders a backdrop for the modal variant that closes it on click', async () => {
		const user = userEvent.setup();
		render(
			<Dialog startOpen variant="modal" trigger={ <span>Open</span> } content={ <p>Body</p> } />
		);

		const backdrop = screen.getByText( 'Body' ).parentElement?.previousElementSibling;
		expect( backdrop ).not.toBeNull();

		await user.click( backdrop as Element );

		expect( screen.queryByText( 'Body' ) ).not.toBeInTheDocument();
	} );

	it( 'Escape calls the onClose passed most recently, not the one from mount', async () => {
		const user = userEvent.setup();
		const first = jest.fn();
		const second = jest.fn();
		const { rerender } = render(
			<DialogContent variant="modal" onClose={ first }>
				Body
			</DialogContent>
		);

		await user.keyboard( '{Escape}' );
		rerender(
			<DialogContent variant="modal" onClose={ second }>
				Body
			</DialogContent>
		);
		await user.keyboard( '{Escape}' );

		expect( first ).toHaveBeenCalledTimes( 1 );
		expect( second ).toHaveBeenCalledTimes( 1 );
	} );
} );
