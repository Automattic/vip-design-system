/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { ConfirmationDialog } from './ConfirmationDialog';

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

const renderDialog = ( props = {} ) => {
	const onConfirm = jest.fn();
	const view = render(
		<ConfirmationDialog
			title="Delete the site?"
			body="This cannot be undone."
			onConfirm={ onConfirm }
			trigger={ <button>Delete</button> }
			{ ...props }
		/>
	);

	return { ...view, onConfirm, user: userEvent.setup() };
};

describe( '<ConfirmationDialog />', () => {
	it( 'asks for confirmation and confirms through the labelled button', async () => {
		const { container, onConfirm, user } = renderDialog();

		await user.click( screen.getByRole( 'button', { name: 'Delete' } ) );

		expect( screen.getByRole( 'heading', { name: 'Delete the site?' } ) ).toBeInTheDocument();
		expect( screen.getByText( 'This cannot be undone.' ) ).toBeInTheDocument();
		expect( onConfirm ).not.toHaveBeenCalled();
		// The deprecated Dialog puts aria-expanded on a generic wrapper, which axe rejects
		// (aria-allowed-attr). The replacement is NewDialog; the rest of the checks still run.
		expect(
			await axe( container, { rules: { 'aria-allowed-attr': { enabled: false } } } )
		).toHaveNoViolations();

		await user.click( screen.getByRole( 'button', { name: 'Confirm' } ) );

		expect( onConfirm ).toHaveBeenCalledTimes( 1 );
		expect( screen.queryByText( 'This cannot be undone.' ) ).not.toBeInTheDocument();
	} );

	it( 'cancels without confirming', async () => {
		const { onConfirm, user } = renderDialog();

		await user.click( screen.getByRole( 'button', { name: 'Delete' } ) );
		await user.click( screen.getByRole( 'button', { name: 'Cancel' } ) );

		expect( onConfirm ).not.toHaveBeenCalled();
		expect( screen.queryByText( 'This cannot be undone.' ) ).not.toBeInTheDocument();
	} );

	it( 'labels the confirm button with the given text', async () => {
		const { user } = renderDialog( { label: 'Yes, delete' } );

		await user.click( screen.getByRole( 'button', { name: 'Delete' } ) );

		expect( screen.getByRole( 'button', { name: 'Yes, delete' } ) ).toBeInTheDocument();
	} );

	it( 'confirms straight from the trigger when no confirmation is needed', async () => {
		const { onConfirm, user } = renderDialog( { needsConfirm: false } );

		await user.click( screen.getByRole( 'button', { name: 'Delete' } ) );

		expect( onConfirm ).toHaveBeenCalledTimes( 1 );
		expect( screen.queryByText( 'This cannot be undone.' ) ).not.toBeInTheDocument();
	} );
} );
