/** @jsxImportSource theme-ui */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';

import { SimplePagination } from './SimplePagination';

const defaultProps = {
	hasNextPage: true,
	hasPreviousPage: true,
	nextParam: { param: 'after', value: 'cursor_abc' },
	previousParam: { param: 'before', value: 'cursor_xyz' },
	onNavigate: jest.fn(),
};

describe( '<SimplePagination />', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'renders a nav landmark with aria-label', () => {
		render( <SimplePagination { ...defaultProps } /> );

		expect( screen.getByRole( 'navigation', { name: 'Pagination' } ) ).toBeInTheDocument();
	} );

	it( 'renders prev and next arrow buttons', () => {
		render( <SimplePagination { ...defaultProps } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeInTheDocument();
		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeInTheDocument();
	} );

	it( 'does not render page number buttons', () => {
		render( <SimplePagination { ...defaultProps } /> );

		expect( screen.queryByRole( 'button', { name: /Go to page/ } ) ).not.toBeInTheDocument();
	} );

	it( 'disables previous button when hasPreviousPage is false', () => {
		render( <SimplePagination { ...defaultProps } hasPreviousPage={ false } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeDisabled();
	} );

	it( 'disables next button when hasNextPage is false', () => {
		render( <SimplePagination { ...defaultProps } hasNextPage={ false } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeDisabled();
	} );

	it( 'disables previous button when previousParam is undefined', () => {
		render( <SimplePagination { ...defaultProps } previousParam={ undefined } /> );

		expect( screen.getByRole( 'button', { name: 'Previous page' } ) ).toBeDisabled();
	} );

	it( 'disables next button when nextParam is undefined', () => {
		render( <SimplePagination { ...defaultProps } nextParam={ undefined } /> );

		expect( screen.getByRole( 'button', { name: 'Next page' } ) ).toBeDisabled();
	} );

	it( 'calls onNavigate with correct param and value when clicking next', async () => {
		const user = userEvent.setup();
		render( <SimplePagination { ...defaultProps } /> );

		await user.click( screen.getByRole( 'button', { name: 'Next page' } ) );

		expect( defaultProps.onNavigate ).toHaveBeenCalledWith( 'after', 'cursor_abc' );
	} );

	it( 'calls onNavigate with correct param and value when clicking previous', async () => {
		const user = userEvent.setup();
		render( <SimplePagination { ...defaultProps } /> );

		await user.click( screen.getByRole( 'button', { name: 'Previous page' } ) );

		expect( defaultProps.onNavigate ).toHaveBeenCalledWith( 'before', 'cursor_xyz' );
	} );

	it( 'renders children content', () => {
		render(
			<SimplePagination { ...defaultProps }>
				<span>Showing results</span>
			</SimplePagination>
		);

		expect( screen.getByText( 'Showing results' ) ).toBeInTheDocument();
	} );

	it( 'renders items-per-page selector when enabled', () => {
		render(
			<SimplePagination
				{ ...defaultProps }
				displayItemsPerPageSelector
				itemsPerPage={ 20 }
				onItemsPerPageChange={ jest.fn() }
			/>
		);

		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
	} );

	it( 'has no accessibility violations', async () => {
		const { container } = render( <SimplePagination { ...defaultProps } /> );

		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'has no accessibility violations with both buttons disabled', async () => {
		const { container } = render(
			<SimplePagination { ...defaultProps } hasNextPage={ false } hasPreviousPage={ false } />
		);

		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
