/**
 * External dependencies
 */
import { render } from '@testing-library/react';
import React from 'react';

/**
 * Internal dependencies
 */
import { Dropdown, restoreFocusOnlyForKeyboard } from './Dropdown';

// Captures what Dropdown hands to the content, so the wiring can be asserted
// rather than inferred from something having rendered.
let mockContentProps: Record< string, unknown > = {};

jest.mock( './DropdownContent', () => ( {
	DropdownContent: ( props: Record< string, unknown > ) => {
		mockContentProps = props;
		// Children are deliberately not rendered: Radix's Arrow is among them and
		// needs a real Popper ancestor, which the stub is not. These tests only
		// care about what reaches the content.
		return null;
	},
} ) );

const renderWith = ( contentProps?: Record< string, unknown > ) => {
	mockContentProps = {};
	render(
		<Dropdown trigger={ <button>Trigger</button> } open contentProps={ contentProps }>
			<span>My Item</span>
		</Dropdown>
	);
};

describe( 'Dropdown close-autofocus wiring', () => {
	it( 'passes the keyboard-only handler by default', () => {
		renderWith();

		expect( mockContentProps.onCloseAutoFocus ).toBe( restoreFocusOnlyForKeyboard );
	} );

	it( 'lets a consumer replace it through contentProps', () => {
		const onCloseAutoFocus = jest.fn();
		renderWith( { onCloseAutoFocus } );

		expect( mockContentProps.onCloseAutoFocus ).toBe( onCloseAutoFocus );
		expect( mockContentProps.onCloseAutoFocus ).not.toBe( restoreFocusOnlyForKeyboard );
	} );

	it( 'still forwards other content props alongside the default handler', () => {
		renderWith( { align: 'start' } );

		expect( mockContentProps.align ).toBe( 'start' );
		expect( mockContentProps.onCloseAutoFocus ).toBe( restoreFocusOnlyForKeyboard );
	} );
} );
