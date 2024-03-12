/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

/**
 * Internal dependencies
 */
import { Radio } from './Radio';

describe( '<Radio />', () => {
	it( 'renders', async () => {
		const { container } = render(
			<Radio
				disabled
				name={ `the_option_` }
				defaultValue={ `disabled-option-a` }
				options={ [
					{
						id: `disabled-option-a`,
						value: `disabled-option-a`,
						label: `I am the option A`,
					},
					{
						id: `disabled-option-b`,
						value: `disabled-option-b`,
						label: `I am the option B`,
					},
				] }
			/>
		);

		expect( screen.getByLabelText( 'I am the option A' ) ).toBeInTheDocument();
		expect( screen.getByLabelText( 'I am the option B' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );

	it( 'renders with a custom label', async () => {
		const { container } = render(
			<Radio
				disabled
				name={ `the_option_` }
				defaultValue={ `disabled-option-a` }
				options={ [
					{
						id: `disabled-option-a`,
						value: `disabled-option-a`,
						label: 'I am ignored',
						renderLabel: ( props, labelStyles ) => (
							<label htmlFor="disabled-option-a" { ...props } sx={ labelStyles }>
								<span>I am the custom option A</span>
							</label>
						),
					},
					{
						id: `disabled-option-b`,
						value: `disabled-option-b`,
						label: `I am the option B`,
					},
				] }
			/>
		);

		expect( screen.getByLabelText( 'I am the custom option A' ) ).toBeInTheDocument();
		expect( screen.getByLabelText( 'I am the option B' ) ).toBeInTheDocument();

		// Check for accessibility issues
		expect( await axe( container ) ).toHaveNoViolations();
	} );
} );
