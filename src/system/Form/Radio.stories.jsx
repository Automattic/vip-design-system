/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Form } from '..';
import { Radio } from './Radio';
import { Flex } from '../Flex';

export default {
	title: 'Form/Radio',
	component: Radio,
};

export const Default = () => {
	const [ checked, setChecked ] = useState( 'a' );

	return (
		<Form.Root>
			<p>
				Per recommendation, if you have a Radio button, use a Fieldset with a legend as wrapper to
				your options.{ ' ' }
				<a href="https://a11y-collective.github.io/demos/en/accessible-code/form-fieldsets.html">
					Reference to Form fieldsets
				</a>
			</p>
			<fieldset>
				<legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					Apply the policy to these domains
				</legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Radio
						name="the_option"
						defaultValue={ checked }
						options={ [
							{
								value: 'a',
								label: 'All domains listed on this environment, and all subdomains',
								id: 'option-a',
							},
							{ value: 'b', label: 'All domains listed on this environment', id: 'option-b' },
						] }
						onChange={ e => setChecked( e.target.value ) }
					/>
				</Flex>
			</fieldset>
		</Form.Root>
	);
};
