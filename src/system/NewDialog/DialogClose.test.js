/**
 * External dependencies
 */
import { Dialog } from '@radix-ui/react-dialog';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { DialogClose } from './DialogClose';

// If you render any Dialog child withou the `<Dialog />` parent, it will throw an error.
const Wrapper = props => <Dialog open={ true } { ...props } />;
const defaultProps = {
	title: 'This is a DialogClose',
};

describe( '<DialogClose />', () => {
	it( 'renders the DialogClose component', async () => {
		const { container } = render(
			<Wrapper>
				<DialogClose { ...defaultProps } />
			</Wrapper>
		);

		expect( screen.getByLabelText( 'Close' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
