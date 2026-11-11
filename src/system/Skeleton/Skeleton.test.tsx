/**
 * External dependencies
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Skeleton } from './Skeleton';

const placeholders = ( container: HTMLElement ) =>
	container.querySelectorAll( '[aria-hidden="true"]' );

describe( '<Skeleton />', () => {
	it( 'renders one placeholder hidden from assistive technology by default', async () => {
		const { container } = render( <Skeleton /> );

		expect( placeholders( container ) ).toHaveLength( 1 );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it.each( [ 2, 5 ] )( 'renders %i placeholders when asked for that many', times => {
		const { container } = render( <Skeleton times={ times } /> );

		expect( placeholders( container ) ).toHaveLength( times );
	} );
} );
