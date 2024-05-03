/**
 * External dependencies
 */
import { render } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

/**
 * Internal dependencies
 */
import LinkExternal from './LinkExternal';

describe( '<LinkExternal />', () => {
	it( 'should render correctly', () => {
		const { container } = render(
			<LinkExternal href="https://google.com/">View on Github</LinkExternal>
		);

		// Make sure <ScreenReaderText> was loaded
		expect( container.querySelector( '.screen-reader-text' ) ).toBeInTheDocument();
	} );
} );
