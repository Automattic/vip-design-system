/**
 * External dependencies
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Table } from './Table';

describe( '<Table />', () => {
	it( 'forwards native table attributes to the table element', async () => {
		const onClick = jest.fn();

		const { container } = render(
			<>
				<p id="table-help">Distribution by edge location.</p>
				<Table
					caption="Blocked requests"
					id="blocked-requests-table"
					aria-describedby="table-help"
					data-testid="blocked-requests-table"
					onClick={ onClick }
					sx={ { minWidth: 640 } }
				>
					<tbody>
						<tr>
							<td>GRU</td>
						</tr>
					</tbody>
				</Table>
			</>
		);

		const table = screen.getByTestId( 'blocked-requests-table' );

		expect( table ).toHaveAttribute( 'id', 'blocked-requests-table' );
		expect( table ).toHaveAttribute( 'aria-describedby', 'table-help' );

		fireEvent.click( table );

		expect( onClick ).toHaveBeenCalledTimes( 1 );
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
