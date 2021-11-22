/**
* External dependencies
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

/**
* Internal dependencies
*/
import { Avatar } from './Avatar';

describe( '<Avatar />', () => {
	it( 'renders the Avatar without an image', () => {
		render( <Avatar name="John Doe" /> );

		expect( screen.getByText( 'J' ) ).toBeInTheDocument();
	} );

	it( 'renders the Avatar with image', () => {
		render( <Avatar name="John Doe" src="path/to/image" /> );

		expect( screen.getByAltText( 'Avatar image from John Doe' ) ).toBeInTheDocument();
	} );
} );
