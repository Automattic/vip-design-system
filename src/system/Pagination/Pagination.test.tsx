/** @jsxImportSource theme-ui */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';
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
		render( <Pagination { ...defaultProps } currentPage={ 5 } totalPages={ 20 } /> );

		const nav = screen.getByRole( 'navigation' );
		expect( nav ).toHaveTextContent( '…' );
	} );

	it( 'does not show ellipsis for small page counts', () => {
		render( <Pagination { ...defaultProps } currentPage={ 1 } totalPages={ 5 } /> );

		const nav = screen.getByRole( 'navigation' );
		expect( nav ).not.toHaveTextContent( '…' );
	} );

	it( 'renders compact variant with Page text', () => {
		render( <Pagination { ...defaultProps } variant="compact" currentPage={ 3 } /> );

		expect( screen.getByText( 'Page' ) ).toBeInTheDocument();
		expect( screen.getByText( 'of 10' ) ).toBeInTheDocument();
	} );

	it( 'renders custom pageSizeOptions in the trigger', () => {
		render(
			<Pagination { ...defaultProps } pageSizeOptions={ [ 5, 25, 75 ] } itemsPerPage={ 5 } />
		);

		expect( screen.getByRole( 'button', { name: /5 \/ page/ } ) ).toBeInTheDocument();
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
	it( 'returns all pages when totalPages <= 7', () => {
		expect( getPageNumbers( 1, 5 ) ).toEqual( [ 1, 2, 3, 4, 5 ] );
		expect( getPageNumbers( 3, 7 ) ).toEqual( [ 1, 2, 3, 4, 5, 6, 7 ] );
	} );

	it( 'returns single page', () => {
		expect( getPageNumbers( 1, 1 ) ).toEqual( [ 1 ] );
	} );

	it( 'shows start ellipsis when current page is near end', () => {
		const result = getPageNumbers( 9, 10 );
		expect( result ).toEqual( [ 1, 'ellipsis', 8, 9, 10 ] );
	} );

	it( 'shows end ellipsis when current page is near start', () => {
		const result = getPageNumbers( 1, 10 );
		expect( result ).toEqual( [ 1, 2, 'ellipsis', 10 ] );
	} );

	it( 'shows both ellipsis when current page is in the middle', () => {
		const result = getPageNumbers( 5, 10 );
		expect( result ).toEqual( [ 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10 ] );
	} );

	it( 'handles page near start with no start ellipsis', () => {
		const result = getPageNumbers( 3, 10 );
		expect( result ).toEqual( [ 1, 2, 3, 4, 'ellipsis', 10 ] );
	} );

	it( 'handles page near end with no end ellipsis', () => {
		const result = getPageNumbers( 8, 10 );
		expect( result ).toEqual( [ 1, 'ellipsis', 7, 8, 9, 10 ] );
	} );
} );
