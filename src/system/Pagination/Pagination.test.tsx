/** @jsxImportSource theme-ui */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';

import { Pagination, getPageNumbers } from './Pagination';

const defaultProps = {
	currentPage: 1,
	totalItems: 200,
	totalPages: 10,
	itemsPerPage: 20,
	onPageChange: jest.fn(),
	onItemsPerPageChange: jest.fn(),
};

describe( '<Pagination />', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders a nav landmark with aria-label', () => {
		render( <Pagination { ...defaultProps } /> );

		expect( screen.getByRole( 'navigation', { name: 'Pagination' } ) ).toBeInTheDocument();
	} );

	it( 'renders prev and next arrow buttons', () => {
		render( <Pagination { ...defaultProps } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeInTheDocument();
	} );

	it( 'disables prev button on first page', () => {
		render( <Pagination { ...defaultProps } currentPage={ 1 } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeDisabled();
	} );

	it( 'disables next button on last page', () => {
		render( <Pagination { ...defaultProps } currentPage={ 10 } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeDisabled();
	} );

	it( 'marks current page with aria-current', () => {
		render( <Pagination { ...defaultProps } currentPage={ 3 } /> );

		expect( screen.getByRole( 'button', { name: 'Go to page 3' } ) ).toHaveAttribute(
			'aria-current',
			'page'
		);
	} );

	it( 'does not mark non-current pages with aria-current', () => {
		render( <Pagination { ...defaultProps } currentPage={ 3 } /> );

		expect( screen.getByRole( 'button', { name: 'Go to page 1' } ) ).not.toHaveAttribute(
			'aria-current'
		);
	} );

	it( 'calls onPageChange when clicking a page number', async () => {
		const user = userEvent.setup();
		render( <Pagination { ...defaultProps } currentPage={ 1 } /> );

		await user.click( screen.getByRole( 'button', { name: 'Go to page 2' } ) );

		expect( defaultProps.onPageChange ).toHaveBeenCalledWith( 2 );
	} );

	it( 'calls onPageChange when clicking next', async () => {
		const user = userEvent.setup();
		render( <Pagination { ...defaultProps } currentPage={ 3 } /> );

		await user.click( screen.getByRole( 'button', { name: 'Next page' } ) );

		expect( defaultProps.onPageChange ).toHaveBeenCalledWith( 4 );
	} );

	it( 'calls onPageChange when clicking prev', async () => {
		const user = userEvent.setup();
		render( <Pagination { ...defaultProps } currentPage={ 3 } /> );

		await user.click( screen.getByRole( 'button', { name: 'Previous page' } ) );

		expect( defaultProps.onPageChange ).toHaveBeenCalledWith( 2 );
	} );

	it( 'shows ellipsis for large page counts', () => {
		render( <Pagination { ...defaultProps } currentPage={ 10 } totalPages={ 20 } /> );

		// Intermediate pages are replaced by ellipsis icon
		expect( screen.queryByRole( 'button', { name: 'Go to page 2' } ) ).not.toBeInTheDocument();
		expect( screen.queryByRole( 'button', { name: 'Go to page 3' } ) ).not.toBeInTheDocument();
	} );

	it( 'does not show ellipsis for small page counts', () => {
		render( <Pagination { ...defaultProps } currentPage={ 1 } totalPages={ 5 } /> );

		// All pages are rendered when total is small
		expect( screen.getByRole( 'button', { name: 'Go to page 2' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Go to page 3' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Go to page 4' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Go to page 5' } ) ).toBeInTheDocument();
	} );

	it( 'renders compact variant with Page text', () => {
		render( <Pagination { ...defaultProps } variant="compact" currentPage={ 3 } /> );

		expect( screen.getByText( 'Page' ) ).toBeInTheDocument();
		expect( screen.getByText( 'of 10' ) ).toBeInTheDocument();
	} );

	it( 'renders custom pageSizeOptions in the trigger', () => {
		render(
			<Pagination
				{ ...defaultProps }
				displayItemsPerPageSelector
				pageSizeOptions={ [ 5, 25, 75 ] }
				itemsPerPage={ 5 }
			/>
		);

		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
		expect( screen.getAllByRole( 'option' ) ).toHaveLength( 3 );
	} );

	it( 'has no accessibility violations (full variant)', async () => {
		const { container } = render( <Pagination { ...defaultProps } currentPage={ 5 } /> );

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'has no accessibility violations (compact variant)', async () => {
		const { container } = render(
			<Pagination { ...defaultProps } variant="compact" currentPage={ 5 } />
		);

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );

describe( 'getPageNumbers', () => {
	it( 'returns all pages when totalPages <= 8', () => {
		expect( getPageNumbers( 1, 5 ) ).toEqual( [ 1, 2, 3, 4, 5 ] );
		expect( getPageNumbers( 3, 7 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7 ] );
		expect( getPageNumbers( 4, 8 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7, 8 ] );
	} );

	it( 'returns single page', () => {
		expect( getPageNumbers( 1, 1 ) ).toEqual( [ 1 ] );
	} );

	it( 'always returns 8 items when totalPages > 8', () => {
		for ( let cp = 1; cp <= 20; cp++ ) {
			expect( getPageNumbers( cp, 20 ) ).toHaveLength( 8 );
		}
	} );

	it( 'shows end ellipsis when current page is near start', () => {
		expect( getPageNumbers( 1, 10 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 'ellipsis', 10 ] );
		expect( getPageNumbers( 3, 10 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 'ellipsis', 10 ] );
		expect( getPageNumbers( 5, 10 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 'ellipsis', 10 ] );
	} );

	it( 'shows start ellipsis when current page is near end', () => {
		expect( getPageNumbers( 9, 10 ) ).toEqual( [ 1, 'ellipsis', 5, 6, 7, 8, 9, 10 ] );
		expect( getPageNumbers( 8, 10 ) ).toEqual( [ 1, 'ellipsis', 5, 6, 7, 8, 9, 10 ] );
	} );

	it( 'shows both ellipsis when current page is in the middle', () => {
		expect( getPageNumbers( 10, 20 ) ).toEqual( [ 1, 'ellipsis', 9, 10, 11, 12, 'ellipsis', 20 ] );
	} );
} );

describe( 'getPageNumbers (open-ended with maxReachablePage)', () => {
	it( 'caps pages to maxReachablePage when near start', () => {
		expect( getPageNumbers( 1, undefined, true, 2 ) ).toEqual( [ 1, 2 ] );
	} );

	it( 'shows all reachable pages when they fit', () => {
		expect( getPageNumbers( 3, undefined, true, 4 ) ).toEqual( [ 1, 2, 3, 4 ] );
	} );

	it( 'shows ellipsis for large reachable ranges', () => {
		expect( getPageNumbers( 8, undefined, true, 9 ) ).toEqual( [ 1, 'ellipsis', 7, 8, 9 ] );
	} );

	it( 'shows both ellipsis when end is far from current page', () => {
		expect( getPageNumbers( 8, undefined, true, 15 ) ).toEqual( [
			1,
			'ellipsis',
			7,
			8,
			9,
			10,
			'ellipsis',
			15,
		] );
	} );

	it( 'returns all pages when maxReachablePage <= 8', () => {
		expect( getPageNumbers( 1, undefined, true, 8 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7, 8 ] );
	} );

	it( 'does not affect behavior when maxReachablePage is undefined', () => {
		expect( getPageNumbers( 1, undefined, true ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7, 'ellipsis' ] );
	} );
} );

describe( 'getPageNumbers (open-ended)', () => {
	it( 'always returns 8 items when page >= 6', () => {
		for ( let cp = 6; cp <= 20; cp++ ) {
			expect( getPageNumbers( cp ) ).toHaveLength( 8 );
		}
	} );

	it( 'returns near-start pattern for pages 1-5', () => {
		expect( getPageNumbers( 1 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7, 'ellipsis' ] );
		expect( getPageNumbers( 5 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7, 'ellipsis' ] );
	} );

	it( 'returns middle pattern with trailing ellipsis for higher pages', () => {
		expect( getPageNumbers( 10 ) ).toEqual( [ 1, 'ellipsis', 9, 10, 11, 12, 13, 'ellipsis' ] );
	} );

	it( 'excludes forward pages and trailing ellipsis when hasNextPage is false', () => {
		expect( getPageNumbers( 1, undefined, false ) ).toEqual( [ 1 ] );
		expect( getPageNumbers( 5, undefined, false ) ).toEqual( [ 1, 2, 3, 4, 5 ] );
		expect( getPageNumbers( 10, undefined, false ) ).toEqual( [
			1,
			'ellipsis',
			5,
			6,
			7,
			8,
			9,
			10,
		] );
	} );
} );

describe( '<Pagination /> with maxReachablePage', () => {
	const maxReachableProps = {
		currentPage: 1,
		itemsPerPage: 20,
		hasNextPage: true,
		maxReachablePage: 2,
		onPageChange: jest.fn(),
		onItemsPerPageChange: jest.fn(),
	};

	it( 'only renders reachable page buttons', () => {
		render( <Pagination { ...maxReachableProps } /> );

		expect( screen.getByRole( 'button', { name: 'Go to page 1' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Go to page 2' } ) ).toBeInTheDocument();
		expect( screen.queryByRole( 'button', { name: 'Go to page 3' } ) ).not.toBeInTheDocument();
		expect( screen.queryByRole( 'button', { name: 'Go to page 7' } ) ).not.toBeInTheDocument();
	} );

	it( 'has no accessibility violations', async () => {
		const { container } = render( <Pagination { ...maxReachableProps } /> );

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );

describe( '<Pagination /> open-ended mode', () => {
	const openEndedProps = {
		currentPage: 5,
		itemsPerPage: 20,
		onPageChange: jest.fn(),
		onItemsPerPageChange: jest.fn(),
	};

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'enables "Next" button when totalPages is omitted', () => {
		render( <Pagination { ...openEndedProps } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).not.toBeDisabled();
	} );

	it( 'disables "Next" button when hasNextPage is false', () => {
		render( <Pagination { ...openEndedProps } hasNextPage={ false } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeDisabled();
	} );

	it( 'calls onPageChange when clicking next in open-ended mode', async () => {
		const user = userEvent.setup();
		render( <Pagination { ...openEndedProps } /> );

		await user.click( screen.getByRole( 'button', { name: 'Next page' } ) );

		expect( openEndedProps.onPageChange ).toHaveBeenCalledWith( 6 );
	} );

	it( 'renders compact variant with "Page" but without "of Y"', () => {
		render( <Pagination { ...openEndedProps } variant="compact" /> );

		expect( screen.getByText( 'Page' ) ).toBeInTheDocument();
		expect( screen.queryByText( /of \d+/ ) ).not.toBeInTheDocument();
	} );

	it( 'has no accessibility violations (open-ended full)', async () => {
		const { container } = render( <Pagination { ...openEndedProps } /> );

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'has no accessibility violations (open-ended compact)', async () => {
		const { container } = render( <Pagination { ...openEndedProps } variant="compact" /> );

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );

describe( '<Pagination /> arrows variant', () => {
	const arrowsProps = {
		variant: 'arrows' as const,
		hasNextPage: true,
		hasPreviousPage: true,
		nextParam: { param: 'after', value: 'cursor_abc' },
		previousParam: { param: 'before', value: 'cursor_xyz' },
		onNavigate: jest.fn(),
	};

	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders a nav landmark with aria-label', () => {
		render( <Pagination { ...arrowsProps } /> );

		expect( screen.getByRole( 'navigation', { name: 'Pagination' } ) ).toBeInTheDocument();
	} );

	it( 'renders prev and next arrow buttons', () => {
		render( <Pagination { ...arrowsProps } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeInTheDocument();
	} );

	it( 'does not render page number buttons', () => {
		render( <Pagination { ...arrowsProps } /> );

		expect( screen.queryByRole( 'button', { name: /Go to page/ } ) ).not.toBeInTheDocument();
	} );

	it( 'disables previous button when hasPreviousPage is false', () => {
		render( <Pagination { ...arrowsProps } hasPreviousPage={ false } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeDisabled();
	} );

	it( 'disables next button when hasNextPage is false', () => {
		render( <Pagination { ...arrowsProps } hasNextPage={ false } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeDisabled();
	} );

	it( 'disables previous button when previousParam is undefined', () => {
		render( <Pagination { ...arrowsProps } previousParam={ undefined } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeDisabled();
	} );

	it( 'disables next button when nextParam is undefined', () => {
		render( <Pagination { ...arrowsProps } nextParam={ undefined } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeDisabled();
	} );

	it( 'calls onNavigate with correct param and value when clicking next', async () => {
		const user = userEvent.setup();
		render( <Pagination { ...arrowsProps } /> );

		await user.click( screen.getByRole( 'button', { name: 'Next page' } ) );

		expect( arrowsProps.onNavigate ).toHaveBeenCalledWith( 'after', 'cursor_abc' );
	} );

	it( 'calls onNavigate with correct param and value when clicking previous', async () => {
		const user = userEvent.setup();
		render( <Pagination { ...arrowsProps } /> );

		await user.click( screen.getByRole( 'button', { name: 'Previous page' } ) );

		expect( arrowsProps.onNavigate ).toHaveBeenCalledWith( 'before', 'cursor_xyz' );
	} );

	it( 'renders children content', () => {
		render(
			<Pagination { ...arrowsProps }>
				<span>Showing results</span>
			</Pagination>
		);

		expect( screen.getByText( 'Showing results' ) ).toBeInTheDocument();
	} );

	it( 'renders items-per-page selector when enabled', () => {
		render(
			<Pagination
				{ ...arrowsProps }
				displayItemsPerPageSelector
				itemsPerPage={ 20 }
				onItemsPerPageChange={ jest.fn() }
			/>
		);

		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
	} );

	it( 'has no accessibility violations', async () => {
		const { container } = render( <Pagination { ...arrowsProps } /> );

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'has no accessibility violations with both buttons disabled', async () => {
		const { container } = render(
			<Pagination { ...arrowsProps } hasNextPage={ false } hasPreviousPage={ false } />
		);

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
