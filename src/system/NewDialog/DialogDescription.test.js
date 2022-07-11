/**
 * External dependencies
 */
import { Dialog } from '@radix-ui/react-dialog';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { DialogDescription } from './DialogDescription';

// If you render any Dialog child withou the `<Dialog />` parent, it will throw an error.
const Wrapper = props => <Dialog open={ true } { ...props } />;
const defaultProps = {
	description: 'My Custom Text',
};

const getParagraph = () => screen.getByText( defaultProps.description );

describe( '<DialogDescription />', () => {
	it( 'renders the DialogDescription component', async () => {
		const { container } = render(
			<Wrapper>
				<DialogDescription { ...defaultProps } />
			</Wrapper>
		);

		expect( getParagraph() ).toHaveTextContent( defaultProps.description );

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders text visually hidden for a11y purposes', async () => {
		const { container } = render(
			<Wrapper>
				<DialogDescription { ...defaultProps } hidden={ true } />
			</Wrapper>
		);

		// Small check to make sure we are hiding with the css class
		expect( container.innerHTML ).toContain( 'screen-reader-text' );

		expect( getParagraph() ).toHaveTextContent( defaultProps.description );
	} );
} );
