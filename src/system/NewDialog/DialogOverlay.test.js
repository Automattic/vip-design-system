/**
 * External dependencies
 */
import { Dialog } from '@radix-ui/react-dialog';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { DialogOverlay } from './DialogOverlay';

// If you render any Dialog child without the `<Dialog />` parent, it will throw an error.
const Wrapper = props => <Dialog open={ true } { ...props } />;

describe( '<DialogOverlay />', () => {
	it( 'renders the DialogOverlay component', async () => {
		const { container } = render(
			<Wrapper>
				<DialogOverlay />
			</Wrapper>
		);

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
