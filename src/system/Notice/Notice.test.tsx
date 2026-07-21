/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Notice } from './Notice';

describe( '<Notice />', () => {
	it( 'accepts a rich title and native div attributes', async () => {
		const { container } = render(
			<Notice
				title={
					<span>
						Rich <strong>notice title</strong>
					</span>
				}
				data-testid="notice"
				role="status"
			>
				Notice content
			</Notice>
		);

		expect( screen.getByText( 'notice title' ) ).toBeInTheDocument();
		expect( screen.getByTestId( 'notice' ) ).toHaveAttribute( 'role', 'status' );
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
