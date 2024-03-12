/**
 * External dependencies
 */
import { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Checkbox, CheckboxProps } from './Checkbox';
import { Form } from '../..';
import { Flex } from '../../Flex';
import { Label } from '../Label';

export default {
	title: 'Form/Checkbox',
	component: Checkbox,
};

export const Default = () => {
	const [ checked, setChecked ] = useState< CheckedState >( true );
	const [ checked2, setChecked2 ] = useState< CheckedState >( false );

	return (
		<Form.Root>
			{ (
				[ 'primary', 'success', 'error', 'warning', 'info' ] as CheckboxProps[ 'variant' ][]
			 ).map( variant => (
				<Form.Fieldset key={ variant }>
					<Form.Legend>Tell me your prefereces</Form.Legend>

					<Flex sx={ { alignItems: 'center' } }>
						<Checkbox
							variant={ variant }
							id={ `check1-${ variant }` }
							checked={ checked }
							aria-labelledby={ `label-check1-${ variant }` }
							onCheckedChange={ setChecked }
						/>
						<Label
							sx={ { m: 0, ml: 2 } }
							htmlFor={ `check1-${ variant }` }
							id={ `label-check1-${ variant }` }
						>
							This option
						</Label>
					</Flex>

					<Flex sx={ { alignItems: 'center' } }>
						<Checkbox
							variant={ variant }
							id={ `check2-${ variant }` }
							checked={ checked2 }
							aria-labelledby={ `label-check2-${ variant }` }
							onCheckedChange={ setChecked2 }
						/>
						<Label
							sx={ { m: 0, ml: 2 } }
							htmlFor={ `check2-${ variant }` }
							id={ `label-check1-${ variant }` }
						>
							This option too
						</Label>
					</Flex>
				</Form.Fieldset>
			) ) }
		</Form.Root>
	);
};
