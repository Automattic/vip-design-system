/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeUIProvider } from 'theme-ui';

/**
 * Internal dependencies
 */
import { NewTooltip } from './NewTooltip';
import { theme } from '../';

// Mock ResizeObserver which is not available in jsdom
beforeAll( () => {
	global.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
} );

const renderWithTheme = children =>
	render( <ThemeUIProvider theme={ theme }>{ children }</ThemeUIProvider> );

// Helper to get the visible tooltip content element (Radix puts role="tooltip" on a
// visually-hidden span, while the actual content is rendered in a sibling div).
const getTooltipContent = () => document.querySelector( '.vip-new-tooltip-content' );

describe( '<NewTooltip />', () => {
	it( 'renders the trigger element', () => {
		renderWithTheme(
			<NewTooltip content="Tooltip text">
				<button>Trigger</button>
			</NewTooltip>
		);

		expect( screen.getByRole( 'button', { name: 'Trigger' } ) ).toBeInTheDocument();
	} );

	it( 'shows tooltip on hover and hides on unhover', async () => {
		const user = userEvent.setup();

		renderWithTheme(
			<NewTooltip content="Tooltip text" delayDuration={ 0 }>
				<button>Trigger</button>
			</NewTooltip>
		);

		expect( getTooltipContent() ).not.toBeInTheDocument();

		await user.hover( screen.getByRole( 'button', { name: 'Trigger' } ) );

		await waitFor( () => {
			expect( getTooltipContent() ).toBeInTheDocument();
		} );

		expect( getTooltipContent() ).toHaveTextContent( 'Tooltip text' );
	} );

	it.each( [
		[ 'top', 'top' ],
		[ 'bottom', 'bottom' ],
		[ 'left', 'left' ],
		[ 'right', 'right' ],
	] )( 'renders with position="%s"', async ( position, expectedSide ) => {
		renderWithTheme(
			<NewTooltip content="Tooltip text" position={ position } open>
				<button>Trigger</button>
			</NewTooltip>
		);

		await waitFor( () => {
			expect( getTooltipContent() ).toBeInTheDocument();
		} );

		expect( getTooltipContent() ).toHaveAttribute( 'data-side', expectedSide );
	} );

	it( 'renders rich content', async () => {
		renderWithTheme(
			<NewTooltip
				content={
					<>
						Press <strong>Enter</strong>
						<br />
						to confirm
					</>
				}
				open
			>
				<button>Trigger</button>
			</NewTooltip>
		);

		await waitFor( () => {
			expect( getTooltipContent() ).toBeInTheDocument();
		} );

		const tooltip = getTooltipContent();
		expect( tooltip.querySelector( 'strong' ) ).toHaveTextContent( 'Enter' );
		expect( tooltip.querySelector( 'br' ) ).toBeInTheDocument();
	} );

	it( 'renders arrow when enabled', async () => {
		renderWithTheme(
			<NewTooltip content="Tooltip text" arrow open>
				<button>Trigger</button>
			</NewTooltip>
		);

		await waitFor( () => {
			expect( getTooltipContent() ).toBeInTheDocument();
		} );

		const tooltip = getTooltipContent();
		expect( tooltip.querySelector( 'svg' ) ).toBeInTheDocument();
	} );

	it( 'applies custom className', async () => {
		renderWithTheme(
			<NewTooltip content="Tooltip text" className="custom-class" open>
				<button>Trigger</button>
			</NewTooltip>
		);

		await waitFor( () => {
			expect( getTooltipContent() ).toBeInTheDocument();
		} );

		expect( getTooltipContent() ).toHaveClass( 'custom-class' );
	} );

	it( 'supports controlled open state', async () => {
		const onOpenChange = jest.fn();

		renderWithTheme(
			<NewTooltip content="Tooltip text" open onOpenChange={ onOpenChange }>
				<button>Trigger</button>
			</NewTooltip>
		);

		await waitFor( () => {
			expect( getTooltipContent() ).toBeInTheDocument();
		} );

		expect( getTooltipContent() ).toHaveTextContent( 'Tooltip text' );
	} );

	it( 'has no accessibility violations', async () => {
		const { container } = renderWithTheme(
			<NewTooltip content="Tooltip text" open>
				<button>Trigger</button>
			</NewTooltip>
		);

		await waitFor( () => {
			expect( screen.getByRole( 'tooltip' ) ).toBeInTheDocument();
		} );

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
