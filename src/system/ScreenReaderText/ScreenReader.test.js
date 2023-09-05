/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
/**
 * Internal dependencies
 */
import ScreenReaderText from '.';

describe( '<ScreenReaderText />', () => {
	it( 'should render correctly', () => {
		const props = {};
		const text = 'Hello there';
		const { container } = render( <ScreenReaderText { ...props }>{ text }</ScreenReaderText> );
		// we're using the querySelector to ensure the class is rendered since it affects the A11Y
		// in case it's removed it could compromise the A11Y of the components using it.
		expect( container.querySelector( '.screen-reader-text' ) ).toBeInTheDocument();

		expect( screen.queryByText( text ) ).toBeInTheDocument();
	} );
} );
