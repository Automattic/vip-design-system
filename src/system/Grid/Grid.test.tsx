/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { Grid } from './Grid';

describe( '<Grid />', () => {
	it( 'renders its children and forwards the ref to the container', async () => {
		const ref = createRef< HTMLDivElement >();
		const { container } = render(
			<Grid ref={ ref } columns={ 2 } data-testid="grid">
				<span>One</span>
				<span>Two</span>
			</Grid>
		);

		expect( ref.current ).toBe( screen.getByTestId( 'grid' ) );
		expect( ref.current ).toContainElement( screen.getByText( 'Two' ) );
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
