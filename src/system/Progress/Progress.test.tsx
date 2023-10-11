/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Progress } from './Progress';

const steps = [ 'Downloading Data', 'Importing Data...', 'Finalizing', 'Done' ];
describe( '<Progress />', () => {
	it( 'renders the progress component', async () => {
		const { container } = render( <Progress steps={ steps } activeStep={ 1 } /> );

		expect( container.getElementsByClassName( 'vip-progress-component' ) ).toBeDefined();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders the progress component with different label text', async () => {
		const { container } = render(
			<Progress forLabel="My progress bar" steps={ steps } activeStep={ 1 } />
		);

		expect( screen.getByLabelText( 'My progress bar' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
