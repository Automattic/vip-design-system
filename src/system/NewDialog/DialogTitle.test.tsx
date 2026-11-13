/**
 * External dependencies
 */
import { Dialog } from '@radix-ui/react-dialog';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { DialogTitle } from './DialogTitle';

import type { ComponentProps } from 'react';

// If you render any Dialog child without the `<Dialog />` parent, it will throw an error.
const Wrapper = ( props: Partial< ComponentProps< typeof Dialog > > ) => (
	<Dialog open={ true } { ...props } />
);
const defaultProps = {
	title: 'This is a DialogTitle',
};

const getTitle = () => screen.getByRole( 'heading' );

describe( '<DialogTitle />', () => {
	it( 'renders the DialogTitle component', async () => {
		const { container } = render(
			<Wrapper>
				<DialogTitle { ...defaultProps } />
			</Wrapper>
		);

		expect( getTitle() ).toHaveTextContent( defaultProps.title );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders text visually hidden for a11y purposes', () => {
		const { container } = render(
			<Wrapper>
				<DialogTitle { ...defaultProps } hidden={ true } />
			</Wrapper>
		);

		// Small check to make sure we are hiding with the css class
		expect( container.innerHTML ).toContain( 'screen-reader-text' );

		expect( getTitle() ).toHaveTextContent( defaultProps.title );
	} );
} );
