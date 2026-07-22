/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';

/**
 * Internal dependencies
 */
import { Box } from './Box';

describe( '<Box />', () => {
	it( 'renders the Box component', async () => {
		const { container } = render( <Box>Box text</Box> );

		expect( screen.getByText( 'Box text' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'type-checks polymorphic anchor usage', () => {
		const anchorRef = React.createRef< HTMLAnchorElement >();

		const examples = {
			anchorBox: (
				<Box
					as="a"
					href="https://wpvip.com"
					target="_blank"
					rel="noreferrer"
					ref={ anchorRef }
					onClick={ event => {
						event.currentTarget.href = 'https://wpvip.com/dashboard';
					} }
				>
					Anchor box
				</Box>
			),
		};

		expect( Object.keys( examples ) ).toHaveLength( 1 );
	} );
} );
