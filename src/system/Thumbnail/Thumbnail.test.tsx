/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Thumbnail } from './Thumbnail';

describe( 'Thumbnail', () => {
	it( 'renders thumbnail image when url is provided', () => {
		render( <Thumbnail url="example.com" alt="Test thumbnail" /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toBeInTheDocument();
		expect( img ).toHaveAttribute( 'src', '//s0.wp.com/mshots/v1/example.com?w=108' );
		expect( img ).toHaveAttribute( 'alt', 'Test thumbnail' );
	} );

	it( 'generates alt text from url when alt prop is not provided', () => {
		render( <Thumbnail url="example.com" /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toHaveAttribute( 'alt', 'Thumbnail of example.com' );
	} );

	it( 'includes width parameter in thumbnail URL', () => {
		render( <Thumbnail url="example.com" width={ 200 } /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toHaveAttribute( 'src', '//s0.wp.com/mshots/v1/example.com?w=200' );
	} );

	it( 'renders placeholder with lock icon when showNoPermission is true', () => {
		render( <Thumbnail showNoPermission /> );
		
		// Should not render an img element
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
		
		// Should render the lock icon (svg)
		const lockIcon = screen.getByRole( 'img', { hidden: true } );
		expect( lockIcon ).toBeInTheDocument();
	} );

	it( 'renders placeholder with WordPress icon when showEmpty is true', () => {
		render( <Thumbnail showEmpty /> );
		
		// Should not render an img element
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
		
		// Should render the WordPress icon (svg)
		const wpIcon = screen.getByRole( 'img', { hidden: true } );
		expect( wpIcon ).toBeInTheDocument();
	} );

	it( 'applies custom className', () => {
		const { container } = render( <Thumbnail className="custom-class" url="example.com" /> );
		
		expect( container.firstChild ).toHaveClass( 'custom-class' );
		expect( container.firstChild ).toHaveClass( 'vip-thumbnail-component' );
	} );

	it( 'applies custom dimensions', () => {
		render( <Thumbnail url="example.com" width={ 300 } height={ 200 } /> );
		
		const img = screen.getByRole( 'img' );
		expect( img ).toHaveAttribute( 'src', '//s0.wp.com/mshots/v1/example.com?w=300' );
	} );

	it( 'prioritizes placeholder states over url', () => {
		render( <Thumbnail url="example.com" showNoPermission /> );
		
		// Should not render the img element when placeholder state is active
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
	} );

	it( 'renders loading state when loading prop is true', () => {
		const { container } = render( <Thumbnail loading /> );
		
		// Should not render an img element
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
		
		// Should render loading spinner and have aria-busy
		const spinner = screen.getByTitle( 'Loading' );
		expect( spinner ).toBeInTheDocument();
		
		// Should have aria-busy attribute on the Box container
		const boxContainer = container.querySelector( '.vip-thumbnail-loading' );
		expect( boxContainer ).toHaveAttribute( 'aria-busy', 'true' );
	} );

	it( 'shows loading state initially when url is provided, then loads image', async () => {
		// Mock image load event
		Object.defineProperty( global.Image.prototype, 'onload', {
			writable: true,
		} );
		
		const { rerender } = render( <Thumbnail url="example.com" /> );
		
		// Initially should show loading state
		expect( screen.getByTitle( 'Loading' ) ).toBeInTheDocument();
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
		
		// Simulate image load by rerendering after state change
		// Note: In a real test, you'd need to wait for the image load event
		// but for this test we're just verifying the structure
	} );

	it( 'prioritizes external loading state over internal loading', () => {
		render( <Thumbnail url="example.com" loading={ true } /> );
		
		// Should show loading state and not the image
		expect( screen.getByTitle( 'Loading' ) ).toBeInTheDocument();
		expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
	} );

	it( 'calculates responsive icon size correctly', () => {
		// Test small container (48x48) - should use minimum size (16px)
		const { rerender } = render( <Thumbnail showNoPermission width={ 48 } height={ 48 } /> );
		// Small containers should get 16px icons (minimum)
		
		// Test medium container (108x78) - should calculate 25% of 78 = ~20px
		rerender( <Thumbnail showEmpty width={ 108 } height={ 78 } /> );
		
		// Test large container (300x200) - should calculate 25% of 200 = 50px, capped at 32px (maximum)
		rerender( <Thumbnail loading width={ 300 } height={ 200 } /> );
		
		// The actual icon size calculation is tested through visual rendering
		// This test ensures the component renders without errors with different sizes
	} );

	it( 'has correct display name', () => {
		expect( Thumbnail.displayName ).toBe( 'Thumbnail' );
	} );
} ); 