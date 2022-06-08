/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
* Internal dependencies
*/
import { OptionRow } from './OptionRow';

describe( '<OptionRow />', () => {
	it( 'renders the OptionRow', async () => {
		const { container } = render(
			<OptionRow
				label="Option Row"
				subTitle="Mostly used to link off to other pages."
				as="a"
			/>
		);

		expect( screen.getByText( 'Mostly used to link off to other pages.' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders a disabled OptionRow', async () => {
		// eslint-disable-next-line max-len
		const image1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='79' height='79' viewBox='0 0 79 79' fill='none' %3E%3Cpath d='M71.4 15.3L54.2 4.2C54 4 53.7 4 53.4 4H26.4C26.1 4 25.8 4.1 25.6 4.2L8.29997 15.3C7.89997 15.6 7.59998 16 7.59998 16.5V32.1V63C7.59998 63.5 7.89997 64 8.29997 64.2L25.5 75.3C25.5 75.3 25.6 75.3 25.6 75.4C25.6 75.4 25.7 75.4 25.7 75.5C25.9 75.6 26 75.6 26.2 75.6H53.2C53.4 75.6 53.5 75.6 53.7 75.5C53.8 75.5 53.8 75.5 53.8 75.4C53.8 75.4 53.9 75.4 53.9 75.3L71.4 64.2C71.5 64.1 71.7 64 71.8 63.8C71.8 63.8 71.8 63.7 71.9 63.7C72 63.6 72.1 63.4 72.1 63.2V63.1C72.1 63 72.1 62.9 72.1 62.8V32.1V16.5C72.1 16 71.8 15.6 71.4 15.3ZM24.9 71.4L10.6 62.2V34.8L24.9 44V71.4ZM51.9 72.6H27.8V44.7H51.9V72.6ZM69.1 31.3L52.9 41.7H26.8L10.6 31.3V17.3L26.8 6.9H52.9L69.1 17.3V31.3Z' fill='%23BD9D70' /%3E%3C/svg%3E";

		const { container } = render(
			<OptionRow
				image={image1}
				label="Option Row"
				subTitle="Mostly used to link off to other pages."
				as="a"
				disabled
				meta=""
			/>
		);

		expect( screen.getByAltText( 'Image representing the list item' ).closest( 'div' ) ).toHaveStyle( { background: 'none' } );
		expect( screen.queryByTestId( 'meta' ) ).not.toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
