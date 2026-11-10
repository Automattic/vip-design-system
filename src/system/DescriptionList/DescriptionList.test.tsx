/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createRef } from 'react';

/**
 * Internal dependencies
 */
import { DescriptionList } from './DescriptionList';

const list = [
	{ label: 'Environment', value: 'Production' },
	{ label: 'Region', value: 'EU' },
];

describe( '<DescriptionList />', () => {
	it( 'renders a definition list with the title and each label and value', async () => {
		const { container } = render( <DescriptionList title="Site" list={ list } /> );

		expect( screen.getByText( 'Site' ) ).toBeInTheDocument();
		expect( screen.getAllByRole( 'term' ).map( term => term.textContent ) ).toEqual( [
			'Environment:',
			'Region:',
		] );
		expect( screen.getAllByRole( 'definition' ).map( dd => dd.textContent ) ).toEqual( [
			'Production',
			'EU',
		] );
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders a captioned table with row headers when asked for a table', async () => {
		const { container } = render( <DescriptionList as="table" title="Site" list={ list } /> );

		expect( screen.getByRole( 'table', { name: 'Summary of Site' } ) ).toBeInTheDocument();
		expect( screen.getAllByRole( 'rowheader' ).map( th => th.textContent ) ).toEqual( [
			'Environment:',
			'Region:',
		] );
		expect( screen.getByRole( 'cell', { name: 'Production' } ) ).toBeInTheDocument();
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'forwards the ref to the wrapper', () => {
		const ref = createRef< HTMLDivElement >();

		render( <DescriptionList ref={ ref } list={ list } /> );

		expect( ref.current ).toContainElement( screen.getByText( 'Production' ) );
	} );
} );
