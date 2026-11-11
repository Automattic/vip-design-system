/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Tooltip } from './Tooltip';

describe( '<Tooltip />', () => {
	it( 'decorates the trigger with the tooltip text and defaults', async () => {
		const { container } = render(
			<Tooltip title="More details" trigger={ <button>Info</button> } />
		);

		const trigger = screen.getByRole( 'button', { name: 'More details' } );
		expect( trigger ).toHaveAttribute( 'data-vip-tooltip', 'More details' );
		expect( trigger ).toHaveAttribute( 'data-vip-tooltip-position', 'top' );
		expect( trigger ).toHaveAttribute( 'data-vip-tooltip-arrow', 'false' );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it.each( [ 'bottom', 'left', 'right' ] as const )(
		'places the tooltip at the %s of the trigger',
		position => {
			render( <Tooltip title="Hint" position={ position } trigger={ <button>Info</button> } /> );

			expect( screen.getByRole( 'button' ) ).toHaveAttribute(
				'data-vip-tooltip-position',
				position
			);
		}
	);

	it( 'turns the arrow on when asked', () => {
		render( <Tooltip title="Hint" arrow trigger={ <button>Info</button> } /> );

		expect( screen.getByRole( 'button' ) ).toHaveAttribute( 'data-vip-tooltip-arrow', 'true' );
	} );

	it( 'renders children after the trigger and nothing else without a trigger', () => {
		const { rerender } = render(
			<Tooltip title="Hint" trigger={ <button>Info</button> }>
				<p>Sibling</p>
			</Tooltip>
		);

		expect( screen.getByRole( 'button' ) ).toBeInTheDocument();
		expect( screen.getByText( 'Sibling' ) ).toBeInTheDocument();

		rerender(
			<Tooltip title="Hint">
				<p>Sibling</p>
			</Tooltip>
		);

		expect( screen.queryByRole( 'button' ) ).not.toBeInTheDocument();
		expect( screen.getByText( 'Sibling' ) ).toBeInTheDocument();
	} );
} );
