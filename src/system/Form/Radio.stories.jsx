/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import { Form } from '..';
import { Radio } from './Radio';
import { Label } from './Label';
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
						name="includeSubdomains"
						id="include-all-domains-opt"
						onChange={ () => setChecked( 'a' ) }
						value={ 'a' }
						checked={ checked === 'a' }
					/>

					<Label htmlFor="include-all-domains-opt" sx={ { mb: 0 } }>
						All domains listed on this environment, and all subdomains
					</Label>
				</Flex>

				<Flex sx={ { alignItems: 'center', mb: 1 } }>
					<Radio
						name="includeSubdomains"
						id="include-subdomains-opt"
						onChange={ () => setChecked( 'b' ) }
						checked={ checked === 'b' }
						value={ 'b' }
					/>

					<Label id="exclude-subdomains" htmlFor="include-subdomains-opt" sx={ { mb: 0 } }>
						All domains listed on this environment
					</Label>
				</Flex>
			</fieldset>
		</Form.Root>
	);
};
