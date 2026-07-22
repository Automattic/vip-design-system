/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { FormSelect } from './FormSelect';

describe( '<FormSelect /> types', () => {
	it( 'type-checks forwarded select props used by consumers', () => {
		const ref = React.createRef< HTMLSelectElement >();

		const examples = {
			name: (
				<FormSelect
					ref={ ref }
					id="dessert"
					name="dessert"
					label="Dessert"
					options={ [
						{
							label: 'Chocolate',
							value: 'chocolate',
						},
					] }
				/>
			),
		};

		expect( Object.keys( examples ) ).toHaveLength( 1 );
	} );
} );
