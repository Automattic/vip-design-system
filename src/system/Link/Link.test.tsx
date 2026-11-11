/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { Link } from './Link';

describe( '<Link />', () => {
	it( 'renders an anchor with its href and forwards the ref', async () => {
		const ref = createRef< HTMLAnchorElement >();
		const { container } = render(
			<Link ref={ ref } href="https://wpvip.com">
				WordPress VIP
			</Link>
		);

		const link = screen.getByRole( 'link', { name: 'WordPress VIP' } );
		expect( link ).toHaveAttribute( 'href', 'https://wpvip.com' );
		expect( ref.current ).toBe( link );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it.each( [
		'primary',
		'button-primary',
		'button-secondary',
		'button-tertiary',
		'button-ghost',
		'button-display',
		'button-danger',
	] as const )( 'renders the %s variant as a link', variant => {
		render(
			<Link href="#" variant={ variant }>
				Go
			</Link>
		);

		expect( screen.getByRole( 'link', { name: 'Go' } ) ).toBeInTheDocument();
	} );
} );
