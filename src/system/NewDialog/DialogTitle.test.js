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

// If you render any Dialog child withou the `<Dialog />` parent, it will throw an error.
const Wrapper = props => <Dialog open={ true } { ...props } />;
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
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders text visually hidden for a11y purposes', async () => {
		const { container } = render(
			<Wrapper>
				<DialogTitle { ...defaultProps } hidden={ true } />
			</Wrapper>
		);

		// Small check to make sure we are hiding with the css class
		expect( container.innerHTML ).toContain( 'overflow: hidden;' );

		expect( getTitle() ).toHaveTextContent( defaultProps.title );
	} );
} );
