/** @jsxImportSource theme-ui */

import { useState } from 'react';

import { Radio, RadioProps } from './Radio';
import { Box, Form, Heading, Link } from '../..';
import { Flex } from '../../Flex';
import { Label } from '../Label';

export default {
	title: 'Radio',
	component: Radio,
	parameters: {
		docs: {
			description: {
				component: `

Radio buttons are a common way for users to make a single selection from a list of options. Since only one radio button can be selected simultaneously (within the same group), each available choice must be its item and label.

This documentation and its contents are inspired by https://designsystem.digital.gov/components/radio-buttons/.

## Guidance

### When to use the Radio component

- **To display a single selection**. When users need to select only one option from a set of mutually exclusive choices.

### When to consider something else

- **Multiple selections**. If users need to select more than one option or if there’s only one item to select, use checkboxes instead.
- **Limited space**. Consider a select component if you don’t have enough space to list out all available options.
- **Selecting none**. If users should be able to select zero of the options or change their mind and unselect an option, consider using checkboxes. You can also choose to add a “none of the above” option to the radio button group instead.

## Accessibility Considerations guidance

- **Use fieldset and legend**. Group related radio buttons together with \`fieldset\` tag and describe the group with \`legend\` tag.
- **Use proper labels and attributes**. Each radio button should have a \`label\` tag. Associate the two by matching the \`label\` tag’s for attribute to the \`input\`’s id attribute.

## Using the component

- **Use a logical order**. Make sure the selection options are organized in a meaningful way, like alphabetical or most-frequent to least-frequent. This helps users easily find the option they’re looking for.
- **Set default values with caution**. Setting a default value can bias a decision, seem pushy, or alienate users who don’t fit your assumptions. Only use a default selection if you have data to back it up.
- **List items vertically**. Vertically-listed options are easier to read than those that are listed horizontally. A horizontal layout can make it difficult to tell which label belongs to which radio button.

-------

## Component Properties
`,
			},
		},
	},
};

export const Default = () => {
	const [ checked, setChecked ] = useState< { [ key: string ]: string } >( {} );
	const toggleChecked = ( radioName: string, value: string = '' ) => {
		setChecked( {
			...checked,
			[ radioName ]: value,
		} );
	};

	return (
		<>
			{ ( [ 'primary', 'success', 'error', 'warning', 'info' ] as RadioProps[ 'variant' ][] ).map(
				variant => (
					<Box key={ variant }>
						<Heading as="h2" sx={ { textTransform: 'capitalize' } }>
							{ variant }
						</Heading>

						<Radio
							variant={ variant }
							onChange={ ( _, option ) =>
								toggleChecked( `the_option_${ variant }`, option?.value )
							}
							name={ `the_option_${ variant }` }
							defaultValue={ checked?.[ `the_option_${ variant }` ] || `${ variant }-option-a` }
							options={ [
								{
									id: `${ variant }-option-a`,
									value: `${ variant }-option-a`,
									label: `I am the ${ variant } option A`,
								},
								{
									id: `${ variant }-option-b`,
									value: `${ variant }-option-b`,
									label: `I am the ${ variant } option B`,
								},
							] }
						/>
					</Box>
				)
			) }
			<Box>
				<Heading as="h2" sx={ { textTransform: 'capitalize' } }>
					Disabled
				</Heading>

				<Radio
					disabled
					name={ `the_option_` }
					defaultValue={ `disabled-option-a` }
					options={ [
						{
							id: `disabled-option-a`,
							value: `disabled-option-a`,
							label: `I am the  option A`,
						},
						{
							id: `disabled-option-b`,
							value: `disabled-option-b`,
							label: `I am the  option B`,
						},
					] }
				/>
			</Box>
		</>
	);
};

export const AcessibleExamples = () => {
	return (
		<Form.Root>
			<p>
				Per recommendation, if you have a Radio button, use a Fieldset with a legend as wrapper to
				your options.{ ' ' }
				<Link href="https://a11y-collective.github.io/demos/en/accessible-code/form-fieldsets.html">
					Reference to Form fieldsets
				</Link>
			</p>
			<Form.Fieldset>
				<Form.Legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					Apply the policy to these domains
				</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Radio
						name="the_option"
						defaultValue="a"
						options={ [
							{
								value: 'a',
								label: 'All domains listed on this environment, and all subdomains',
								id: 'option-a',
							},
							{ value: 'b', label: 'All domains listed on this environment', id: 'option-b' },
						] }
					/>
				</Flex>
			</Form.Fieldset>

			<Form.Fieldset>
				<Form.Legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					With a custom Label (Potential A11Y issue, if you don&apos;t build manage the label
					correctly)
				</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Radio
						name="the_option_custom"
						defaultValue="a"
						options={ [
							{
								value: 'a',
								renderLabel: ( commonProps, labelStyle ) => (
									<Label
										{ ...commonProps }
										className="custom-class"
										sx={ { ...labelStyle, color: 'error' } }
									>
										(Custom) All domains listed on this environment, and all subdomains
									</Label>
								),
								id: 'another-option-custom-a',
							},
							{
								value: 'b',
								label: 'All domains listed on this environment',
								labelProps: {
									id: 'label-option-custom-b-custom-props',
								},
								className: 'custom-class-for-this',
								id: 'option-custom-b',
								inputProps: {
									'aria-describedby': 'describe-radio-all-domains-subdomains',
								},
							},
						] }
					/>
				</Flex>
			</Form.Fieldset>

			<p id="describe-radio-all-domains-subdomains" sx={ { mt: 2 } }>
				This is a explanation for custom option b
			</p>

			<Form.Fieldset>
				<Form.Legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					All Disabled options
				</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Radio
						disabled
						name="the_option_disabled"
						defaultValue={ 'a_disabled' }
						options={ [
							{
								value: 'a_disabled',
								label: 'All domains listed on this environment, and all subdomains',
								id: 'option-a_disabled',
							},
							{
								value: 'b',
								label: 'All domains listed on this environment',
								id: 'option-b_disabled',
							},
						] }
					/>
				</Flex>
			</Form.Fieldset>

			<Form.Fieldset>
				<Form.Legend sx={ { mb: 0, fontSize: 2, fontWeight: 'bold' } }>
					Only one Disabled option
				</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Radio
						name="the_option_disabled_two"
						defaultValue={ 'a_disabled_two' }
						options={ [
							{
								value: 'a_disabled_two',
								label: 'All domains listed on this environment, and all subdomains',
								id: 'option-a_disabled_two',
							},
							{
								disabled: true,
								value: 'b',
								label: 'All domains listed on this environment',
								id: 'option-b_disabled_two',
							},
						] }
					/>
				</Flex>
			</Form.Fieldset>
		</Form.Root>
	);
};
