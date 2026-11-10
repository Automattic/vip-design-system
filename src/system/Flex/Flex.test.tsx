/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { Flex } from './Flex';

describe( '<Flex />', () => {
	it( 'renders its children and forwards the ref to the container', async () => {
		const ref = createRef< HTMLElement >();
		const { container } = render(
			<Flex ref={ ref } data-testid="flex">
				<span>One</span>
				<span>Two</span>
			</Flex>
		);

		expect( ref.current ).toBe( screen.getByTestId( 'flex' ) );
		expect( ref.current ).toContainElement( screen.getByText( 'Two' ) );
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
