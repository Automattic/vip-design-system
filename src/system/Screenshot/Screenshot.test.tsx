/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Screenshot } from './Screenshot';

describe( 'Screenshot', () => {
	it( 'renders screenshot image when url is provided', () => {
		render( <Screenshot url="example.com" alt="Test screenshot" /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toBeInTheDocument();
		expect( img ).toHaveAttribute( 'src', '//s0.wp.com/mshots/v1/example.com?w=108' );
		expect( img ).toHaveAttribute( 'alt', 'Test screenshot' );
	} );

	it( 'generates alt text from url when alt prop is not provided', () => {
		render( <Screenshot url="example.com" /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toHaveAttribute( 'alt', 'Screenshot of example.com' );
	} );

	it( 'includes width parameter in screenshot URL', () => {
		render( <Screenshot url="example.com" width={ 200 } /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toHaveAttribute( 'src', '//s0.wp.com/mshots/v1/example.com?w=200' );
	} );

	it( 'renders placeholder with lock icon when showNoPermission is true', () => {
		render( <Screenshot showNoPermission /> );
		
		// Should not render an img element
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
		
		// Should render the lock icon (svg)
		const lockIcon = screen.getByRole( 'img', { hidden: true } );
		expect( lockIcon ).toBeInTheDocument();
	} );

	it( 'renders placeholder with lock icon when showEmpty is true', () => {
		render( <Screenshot showEmpty /> );
		
		// Should not render an img element
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
		
		// Should render the lock icon (svg)
		const lockIcon = screen.getByRole( 'img', { hidden: true } );
		expect( lockIcon ).toBeInTheDocument();
	} );

	it( 'applies custom className', () => {
		const { container } = render( <Screenshot className="custom-class" url="example.com" /> );
		
		expect( container.firstChild ).toHaveClass( 'custom-class' );
		expect( container.firstChild ).toHaveClass( 'vip-screenshot-component' );
	} );

	it( 'applies custom dimensions', () => {
		render( <Screenshot url="example.com" width={ 300 } height={ 200 } /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toHaveAttribute( 'src', '//s0.wp.com/mshots/v1/example.com?w=300' );
	} );

	it( 'prioritizes placeholder states over url', () => {
		render( <Screenshot url="example.com" showNoPermission /> );
		
		// Should not render the img element when placeholder state is active
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
	} );

	it( 'has correct display name', () => {
		expect( Screenshot.displayName ).toBe( 'Screenshot' );
	} );
} ); 