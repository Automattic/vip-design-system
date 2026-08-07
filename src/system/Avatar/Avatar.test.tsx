/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Avatar } from './Avatar';

describe( '<Avatar />', () => {
	it( 'renders the Avatar without an image', async () => {
		const { container } = render( <Avatar name="John Doe" /> );

		expect( screen.getByText( 'J' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Avatar with image', async () => {
		const { container } = render( <Avatar name="John Doe" src="path/to/image" /> );

		expect( screen.getByAltText( 'Avatar image from John Doe' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'falls back to the initial when the image fails to load', async () => {
		const { container } = render( <Avatar name="John Doe" src="path/to/broken/image" /> );

		fireEvent.error( screen.getByAltText( 'Avatar image from John Doe' ) );

		expect( screen.getByText( 'J' ) ).toBeInTheDocument();
		expect( container.querySelector( 'img' ) ).not.toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'falls back to the abbreviation when the image fails to load', () => {
		render( <Avatar name="Taylor Swift" abbr="TS" src="path/to/broken/image" /> );

		fireEvent.error( screen.getByAltText( 'Avatar image from Taylor Swift' ) );

		expect( screen.getByText( 'TS' ) ).toBeInTheDocument();
	} );

	it( 'falls back to the user icon when the image fails and there is no name', async () => {
		const { container } = render( <Avatar src="path/to/broken/image" /> );

		fireEvent.error( container.querySelector( 'img' ) as HTMLImageElement );

		expect( screen.getByTestId( 'avatar-fallback-icon' ) ).toBeInTheDocument();
		expect( container.querySelector( 'img' ) ).not.toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the user icon when there is no image, name, or abbreviation', async () => {
		const { container } = render( <Avatar /> );

		expect( screen.getByTestId( 'avatar-fallback-icon' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the icon instead of initials when fallback is "icon"', async () => {
		const { container } = render( <Avatar name="John Doe" fallback="icon" /> );

		expect( screen.getByTestId( 'avatar-fallback-icon' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'J' ) ).not.toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the icon when fallback is "icon" and the image fails to load', () => {
		render( <Avatar name="John Doe" fallback="icon" src="path/to/broken/image" /> );

		fireEvent.error( screen.getByAltText( 'Avatar image from John Doe' ) );

		expect( screen.getByTestId( 'avatar-fallback-icon' ) ).toBeInTheDocument();
		expect( screen.queryByText( 'J' ) ).not.toBeInTheDocument();
	} );

	it( 'still shows a working image when fallback is "icon"', () => {
		render( <Avatar name="John Doe" fallback="icon" src="path/to/image" /> );

		expect( screen.getByAltText( 'Avatar image from John Doe' ) ).toBeInTheDocument();
		expect( screen.queryByTestId( 'avatar-fallback-icon' ) ).not.toBeInTheDocument();
	} );

	it( 'renders initials by default when fallback is not set', () => {
		render( <Avatar name="John Doe" abbr="JD" /> );

		expect( screen.getByText( 'JD' ) ).toBeInTheDocument();
		expect( screen.queryByTestId( 'avatar-fallback-icon' ) ).not.toBeInTheDocument();
	} );

	it( 'scales the fallback icon with the size prop', () => {
		render( <Avatar size={ 64 } /> );

		expect( screen.getByTestId( 'avatar-fallback-icon' ).querySelector( 'svg' ) ).toHaveAttribute(
			'height',
			'40'
		);
	} );

	it( 'retries when the src changes after a failure', () => {
		const { container, rerender } = render( <Avatar name="John Doe" src="path/to/broken/image" /> );

		fireEvent.error( screen.getByAltText( 'Avatar image from John Doe' ) );
		expect( container.querySelector( 'img' ) ).not.toBeInTheDocument();

		rerender( <Avatar name="John Doe" src="path/to/working/image" /> );

		expect( container.querySelector( 'img' ) ).toHaveAttribute( 'src', 'path/to/working/image' );
	} );

	it( 'falls back when a server-rendered image failed before hydration', () => {
		const completeSpy = jest
			.spyOn( HTMLImageElement.prototype, 'complete', 'get' )
			.mockReturnValue( true );
		const naturalWidthSpy = jest
			.spyOn( HTMLImageElement.prototype, 'naturalWidth', 'get' )
			.mockReturnValue( 0 );

		const { container } = render( <Avatar name="John Doe" src="path/to/broken/image" /> );

		expect( screen.getByText( 'J' ) ).toBeInTheDocument();
		expect( container.querySelector( 'img' ) ).not.toBeInTheDocument();

		completeSpy.mockRestore();
		naturalWidthSpy.mockRestore();
	} );

	it( 'does not render a placeholder alt text when there is no name', () => {
		const { container } = render( <Avatar src="path/to/image" /> );

		expect( container.querySelector( 'img' ) ).toHaveAttribute( 'alt', '' );
		expect( screen.queryByAltText( /undefined/ ) ).not.toBeInTheDocument();
	} );
} );
