/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Form } from '..';
import { Checkbox } from './Checkbox';
import { Label } from './Label';
import { Flex } from '../Flex';

export default {
	title: 'Form/Checkbox',
	component: Checkbox,
};

export const Default = () => {
	const [ checked, setChecked ] = useState( true );
	const [ checked2, setChecked2 ] = useState( false );

	return (
		<Form.Root>
			<fieldset>
				<legend>Tell me your prefereces</legend>

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
			</fieldset>
		</Form.Root>
	);
};
