/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
  * Internal dependencies
  */
import { Select } from './Select';

const defaultProps = {};

describe( '<Select />', () => {
	it( 'renders the Select component with the default placeholder', async () => {
		const { container } = render( <Select { ...defaultProps } /> );

		const placeholder = screen.getByText( ( content, element ) => {
			return element.tagName.toLowerCase() === 'div' && content.startsWith( 'Select' );
		} );

		expect( placeholder ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
