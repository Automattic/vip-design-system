/**
 * Internal dependencies
 */
import { wasKeyboardInput } from './inputModality';

describe( 'inputModality', () => {
	it( 'assumes keyboard before any input is observed', () => {
		// Showing a focus ring to someone using a mouse is a smaller failure
		// than hiding it from someone navigating by keyboard.
		expect( wasKeyboardInput() ).toBe( true );
	} );

	it( 'reports pointer after a pointer interaction', () => {
		window.dispatchEvent( new Event( 'pointerdown' ) );

		expect( wasKeyboardInput() ).toBe( false );
	} );

	it( 'reports keyboard after a key press', () => {
		window.dispatchEvent( new Event( 'pointerdown' ) );
		window.dispatchEvent( new Event( 'keydown' ) );

		expect( wasKeyboardInput() ).toBe( true );
	} );

	it( 'tracks whichever input came last', () => {
		window.dispatchEvent( new Event( 'keydown' ) );
		window.dispatchEvent( new Event( 'pointerdown' ) );
		expect( wasKeyboardInput() ).toBe( false );

		window.dispatchEvent( new Event( 'keydown' ) );
		expect( wasKeyboardInput() ).toBe( true );
	} );
} );
