/**
 * External dependencies
 */
import { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Checkbox } from './Checkbox';
import { Label } from './Label';
import { Form } from '..';
import { Flex } from '../Flex';

export default {
	title: 'Form/Checkbox',
	component: Checkbox,
};

export const Default = () => {
	const [ checked, setChecked ] = useState< CheckedState >( true );
	const [ checked2, setChecked2 ] = useState< CheckedState >( false );

	return (
		<Form.Root>
			<Form.Fieldset>
				<Form.Legend>Tell me your prefereces</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Checkbox
						id="check1"
						checked={ checked }
						aria-labelledby="label-check1"
						onCheckedChange={ setChecked }
					/>
					<Label sx={ { m: 0, ml: 2 } } htmlFor="check1" id="label-check1">
						This option
					</Label>
				</Flex>

				<Flex sx={ { alignItems: 'center' } }>
					<Checkbox
						id="check2"
						checked={ checked2 }
						aria-labelledby="label-check2"
						onCheckedChange={ setChecked2 }
					/>
					<Label sx={ { m: 0, ml: 2 } } htmlFor="check2" id="label-check2">
						This option too
					</Label>
				</Flex>
			</Form.Fieldset>
		</Form.Root>
	);
};
