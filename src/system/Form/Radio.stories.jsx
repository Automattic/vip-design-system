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
import { Label } from './Label';

export default {
	title: 'Form/Radio',
	component: Radio,
};

export const Default = () => {
	const [ checked, setChecked ] = useState( 'a' );
	const [ checked2, setChecked2 ] = useState( 'b' );

	return (
		<Form.Root>
			<p>
				Per recommendation, if you have a Radio button, use a Fieldset with a legend as wrapper to
				your options.{ ' ' }
				<a href="https://a11y-collective.github.io/demos/en/accessible-code/form-fieldsets.html">
					Reference to Form fieldsets
				</a>
			</p>
			<Form.Fieldset>
				<Form.Legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					Apply the policy to these domains
				</Form.Legend>

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
			</Form.Fieldset>

			<Form.Fieldset>
				<Form.Legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					With a custom Label
				</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Radio
						name="the_option_custom"
						defaultValue={ checked2 }
						options={ [
							{
								value: 'a',
								label: (
									<Label
										htmlFor="option-custom-a"
										className="custom-class"
										sx={ { color: '#bf2a23' } }
									>
										(Custom) All domains listed on this environment, and all subdomains
									</Label>
								),
								id: 'option-custom-a',
							},
							{
								value: 'b',
								label: 'All domains listed on this environment',
								labelProps: {
									id: 'label-option-custom-b-custom-props',
								},
								className: 'custom-class-for-this',
								'aria-describedby': 'describe-radio-all-domains-subdomains',
								id: 'option-custom-b',
							},
						] }
						onChange={ ( _, option ) => setChecked2( option.value ) }
					/>
				</Flex>
			</Form.Fieldset>

			<p id="describe-radio-all-domains-subdomains" sx={ { mt: 2 } }>
				This is a explanation for custom option b
			</p>
		</Form.Root>
	);
};
