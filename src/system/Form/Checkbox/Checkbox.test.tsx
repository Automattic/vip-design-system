/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Flex } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Checkbox } from './Checkbox';
import { Label } from '..';

describe( '<Checkbox />', () => {
	it( 'renders', async () => {
		const { container } = render(
			<Flex sx={ { alignItems: 'center' } }>
				<Checkbox
					id={ `check1` }
					checked
					aria-labelledby={ `label-check1` }
					onCheckedChange={ () => {} }
				/>
				<Label clickable htmlFor={ `check1` } id={ `label-check1` }>
					This option
				</Label>
			</Flex>
		);

		expect( screen.getByLabelText( 'This option' ) ).toBeInTheDocument();

		const checkbox = screen.getByRole( 'checkbox' );
		expect( checkbox ).toBeChecked();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders disabled', async () => {
		const { container } = render(
			<Flex sx={ { alignItems: 'center' } }>
				<Checkbox
					id={ `check1` }
					disabled
					aria-labelledby={ `label-check1` }
					onCheckedChange={ () => {} }
				/>
				<Label clickable htmlFor={ `check1` } id={ `label-check1` }>
					This option
				</Label>
			</Flex>
		);

		const button = screen.getByLabelText( 'This option' );

		expect( button ).toHaveAttribute( 'aria-disabled', 'true' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders label and hint', async () => {
		const { container } = render(
			<Checkbox
				id={ `check1` }
				disabled
				aria-labelledby={ `label-check1` }
				onCheckedChange={ () => {} }
				hasError={ true }
				errorMessage="Check if you agree"
				label="I understand and agree to the terms and conditions"
				forLabel="check1"
			/>
		);

		const button = screen.getByLabelText( /I understand/ );

		expect( button ).toHaveAttribute( 'aria-disabled', 'true' );

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
