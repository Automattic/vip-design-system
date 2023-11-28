/**
 * External dependencies
 */
import { Dialog } from '@radix-ui/react-dialog';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { DialogCloseDefault as DialogClose, DialogCloseProps } from './DialogClose';

// If you render any Dialog child without the `<Dialog />` parent, it will throw an error.
const Wrapper = props => <Dialog open={ true } { ...props } />;

describe( '<DialogClose />', () => {
	it( 'renders the DialogClose component', async () => {
		const { container } = render(
			<Wrapper>
				<DialogClose />
			</Wrapper>
		);

		expect( screen.getByLabelText( 'Close' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
