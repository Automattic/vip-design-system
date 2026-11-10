/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { Heading } from './Heading';

describe( '<Heading />', () => {
	it( 'renders an h3 by default', async () => {
		const { container } = render( <Heading>Title</Heading> );

		expect( screen.getByRole( 'heading', { level: 3, name: 'Title' } ) ).toBeInTheDocument();
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it.each( [
		[ 'h1', 1 ],
		[ 'h2', 2 ],
		[ 'h4', 4 ],
		[ 'h5', 5 ],
		[ 'h6', 6 ],
	] as const )( 'renders the %s element for that variant', ( variant, level ) => {
		render( <Heading variant={ variant }>Title</Heading> );

		expect( screen.getByRole( 'heading', { level } ) ).toBeInTheDocument();
	} );

	it( 'keeps the component class next to a custom one and forwards the ref', () => {
		const ref = createRef< HTMLHeadingElement >();

		render(
			<Heading ref={ ref } className="custom">
				Title
			</Heading>
		);

		const heading = screen.getByRole( 'heading' );
		expect( ref.current ).toBe( heading );
		expect( heading ).toHaveClass( 'vip-heading-component', 'custom' );
	} );
} );
