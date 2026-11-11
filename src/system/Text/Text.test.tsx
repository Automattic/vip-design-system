/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { Text } from './Text';

describe( '<Text />', () => {
	it( 'renders a paragraph by default', async () => {
		const { container } = render( <Text>Body copy</Text> );

		expect( screen.getByText( 'Body copy' ).tagName ).toBe( 'P' );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the element given by `as`', () => {
		render( <Text as="span">Inline copy</Text> );

		expect( screen.getByText( 'Inline copy' ).tagName ).toBe( 'SPAN' );
	} );

	it( 'keeps the component class next to a custom one and forwards the ref', () => {
		const ref = createRef< HTMLParagraphElement >();

		render(
			<Text ref={ ref } className="custom">
				Body copy
			</Text>
		);

		const text = screen.getByText( 'Body copy' );
		expect( ref.current ).toBe( text );
		expect( text ).toHaveClass( 'vip-text-component', 'custom' );
	} );
} );
