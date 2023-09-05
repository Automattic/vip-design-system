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
			<OptionRow label="Option Row" subTitle="Mostly used to link off to other pages." as="a" />
		);

		expect( screen.getByText( 'Mostly used to link off to other pages.' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders a disabled OptionRow', async () => {
		const { container } = render(
			<OptionRow
				label="Option Row"
				subTitle="Mostly used to link off to other pages."
				as="a"
				disabled
				variant="h3"
				meta=""
			/>
		);

		expect( screen.queryByTestId( 'meta' ) ).not.toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
