import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import LinkExternal from './LinkExternal';

const props = {
	children: 'View on Github',
	href: 'https://github.com/Automattic/vip-design-system',
};

describe( '<LinkExternal />', () => {
	it( 'should render correctly', () => {
		render( <LinkExternal { ...props }>View on Github</LinkExternal> );

		const link = screen.getByRole( 'link' );

		expect( link ).toHaveTextContent( /view on github/i );
		expect( link ).toHaveTextContent( /external link/i );
		expect( link ).toHaveAttribute( 'target', '_self' );
		expect( link ).toHaveAttribute( 'rel', '' );
	} );

	it( 'should open in new tab when newTab is true', () => {
		render( <LinkExternal { ...props } newTab /> );

		const link = screen.getByRole( 'link' );

		expect( link ).toHaveTextContent( /opens in a new tab/i );
		expect( link ).toHaveAttribute( 'target', '_blank' );
		expect( link ).toHaveAttribute( 'rel', 'noopener noreferrer' );
	} );

	it( 'should contain additional screenreader text when added', () => {
		render( <LinkExternal { ...props } screenReaderText="VIP Design System" /> );

		expect( screen.getByRole( 'link', { name: /vip design system/i } ) ).toBeInTheDocument();
	} );

	it( 'should hide icon when showExternalIcon is false', () => {
		render( <LinkExternal { ...props } showExternalIcon={ false } /> );

		expect( screen.queryByText( '↗' ) ).not.toBeInTheDocument();
	} );
} );
