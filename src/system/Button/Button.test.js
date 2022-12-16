/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Button } from './Button';

const BUTTON_TEXT = 'Button Text';

describe( '<Button />', () => {
	it( 'renders the Button component', async () => {
		const onClick = jest.fn( () => {} );
		const { container } = render( <Button onClick={ onClick }>{ BUTTON_TEXT }</Button> );
		const component = screen.getByText( BUTTON_TEXT );

		expect( component ).toBeInTheDocument();

		fireEvent.click( component );
		expect( onClick ).toHaveBeenCalledTimes( 1 );

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the Button with aria-disabled prop', async () => {
		const onClick = jest.fn( () => {} );
		const { container } = render(
			<Button disabled onClick={ onClick }>
				{ BUTTON_TEXT }
			</Button>
		);
		const component = screen.getByText( BUTTON_TEXT );

		expect( component ).toBeInTheDocument();
		expect( component ).toHaveAttribute( 'aria-disabled', 'true' );
		expect( component ).not.toHaveAttribute( 'disabled' );

		fireEvent.click( component );
		expect( onClick ).toHaveBeenCalledTimes( 0 );

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
