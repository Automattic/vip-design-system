/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { FormSelect } from './FormSelect';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry Chocolate Vanilla Chocolate Vanilla' },
	{ value: 'vanilla', label: 'Vanilla' },
];

const defaultProps = {
	label: 'This is a label',
	forLabel: 'my_desert_list',
	options,
};

const groupedProps = {
	...defaultProps,
	options: [
		{
			label: 'Group name',
			options: [ options[ 0 ] ],
		},
		{
			label: 'Another Group name',
			options: [ options[ 1 ], options[ 2 ] ],
		},
	],
};

describe( '<FormSelect />', () => {
	it( 'renders the FormSelect component', async () => {
		const { container } = render( <FormSelect id="my_desert_list" { ...defaultProps } /> );

		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
		expect( screen.getAllByRole( 'option' ) ).toHaveLength( 3 );
		expect( screen.queryByRole( 'group' ) ).not.toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the FormSelect component with optgroup when options are grouped', async () => {
		const { container } = render( <FormSelect id="my_desert_list" { ...groupedProps } /> );

		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();
		expect( screen.getAllByRole( 'option' ) ).toHaveLength( 3 );
		expect( screen.getAllByRole( 'group' ) ).toHaveLength( 2 );

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the FormSelect component when isInline is true', async () => {
		const { container } = render( <FormSelect id="my_desert_list" isInline { ...defaultProps } /> );

		expect( screen.getByLabelText( defaultProps.label ) ).toBeInTheDocument();
		expect( screen.getByRole( 'combobox' ) ).toBeInTheDocument();

		// Check for accessibility issues
		await expect( await axe( container ) ).toHaveNoViolations();
	} );
} );