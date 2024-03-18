/**
 * External dependencies
 */
import { CheckedState } from '@radix-ui/react-checkbox';
import { createRef, useEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import { Checkbox, CheckboxProps } from './Checkbox';
import { Form, Text } from '../..';
import { Flex } from '../../Flex';
import { Label } from '../Label';

export default {
	title: 'Form/Checkbox',
	component: Checkbox,
	parameters: {
		docs: {
			description: {
				component: `

Checkboxes are an easily understandable way to indicate that users can select one or more answers to a question or items from a list. They’re always followed by a label or instructions that clearly indicate what checking the box represents.

This documentation and its contents are inspired by https://designsystem.digital.gov/components/checkbox/ and https://carbondesignsystem.com/components/checkbox/.

## Guidance

### When to use the Checkbox component

- **To display multiple answers**. When a user can select any number of choices from a list.
- **To allow users to toggle answers**. When a user needs to acknowledge acceptance of something (like terms of service) or switch between two opposite states, such as unchecked = “no” and checked = “yes.”
- **To programmatically (JavaScript) use intermediate states**. When you are in a situation where you need to programmatically set the checkbox to an intermediate state, you can use the indeterminate state.

### When to consider something else

- **Single selection only**. If a user can only select one option from a list of many, use Radio buttons instead.
- **Single selection for Groups**. If you display more information in a single selection, use the RadioBoxGroup component.

## Accessibility Considerations guidance

- **Use a fieldset and legend for a checkbox group**. Surround a related set of checkboxes with a \`fieldset\`. The \`legend\` provides context for the grouping. Don’t use fieldset and legend for a single check.
- **Use semantic tags**. Each input should have a semantic tag for the id attribute, and its corresponding label should have the same value in its for attribute.

## Using the component

- **Use a logical order**. Make sure the selection options are organized in a meaningful way, like alphabetical or most-frequent to least-frequent. This helps users easily find the option they’re looking for.

-------

## Component Properties
`,
			},
		},
	},
};

export const Default = () => {
	const [ checked, setChecked ] = useState< CheckedState >( true );
	const [ checked2, setChecked2 ] = useState< CheckedState >( false );

	return (
		<Form.Root>
			{ ( [ 'primary', 'success', 'brand' ] as CheckboxProps[ 'variant' ][] ).map( variant => (
				<Form.Fieldset key={ variant }>
					<Form.Legend>Tell me your { variant } prefereces</Form.Legend>

					<Flex sx={ { alignItems: 'center' } }>
						<Checkbox
							variant={ variant }
							id={ `check1-${ variant }` }
							checked={ checked }
							aria-labelledby={ `label-check1-${ variant }` }
							onCheckedChange={ setChecked }
						/>
						<Label
							clickable
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
							clickable
							sx={ { m: 0, ml: 2 } }
							htmlFor={ `check2-${ variant }` }
							id={ `label-check2-${ variant }` }
						>
							This option too
						</Label>
					</Flex>
				</Form.Fieldset>
			) ) }

			<Form.Fieldset>
				<Form.Legend>Tell me your Disabled prefereces</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Checkbox
						disabled
						variant="disabled"
						id={ `check1-disabled` }
						checked={ checked }
						aria-labelledby={ `label-check1-disabled` }
						onCheckedChange={ setChecked }
					/>
					<Label
						clickable
						sx={ { m: 0, ml: 2 } }
						htmlFor={ `check1-disabled` }
						id={ `label-check1-disabled` }
					>
						This option
					</Label>
				</Flex>

				<Flex sx={ { alignItems: 'center' } }>
					<Checkbox
						disabled
						id={ `check2-disabled` }
						checked={ checked2 }
						aria-labelledby={ `label-check2-disabled` }
						onCheckedChange={ setChecked2 }
					/>
					<Label
						clickable
						sx={ { m: 0, ml: 2 } }
						htmlFor={ `check2-disabled` }
						id={ `label-check2-disabled` }
					>
						This option too
					</Label>
				</Flex>
			</Form.Fieldset>
		</Form.Root>
	);
};

export const Indeterminate = () => {
	// Creat a ref to the manipula an input
	const checkRef = createRef< HTMLInputElement >();

	useEffect( () => {
		if ( checkRef.current ) {
			checkRef.current.indeterminate = true;
		}
	}, [ checkRef ] );

	return (
		<Form.Root>
			{ ( [ 'primary', 'success', 'brand' ] as CheckboxProps[ 'variant' ][] ).map( variant => (
				<Form.Fieldset key={ variant }>
					<Form.Legend>Indeterminate state { variant }</Form.Legend>

					<Flex sx={ { alignItems: 'center' } }>
						<Checkbox
							variant={ variant }
							id={ `check1-${ variant }` }
							aria-labelledby={ `label-check1-${ variant }` }
							checked={ 'indeterminate' }
						/>

						<Label
							sx={ { m: 0, ml: 2, color: 'text', fontWeight: 'regular' } }
							htmlFor={ `check1-${ variant }` }
							id={ `label-check1-${ variant }` }
						>
							This option
						</Label>
					</Flex>
				</Form.Fieldset>
			) ) }

			<Form.Fieldset>
				<Form.Legend>Indeterminate state disabled</Form.Legend>

				<Flex sx={ { alignItems: 'center' } }>
					<Checkbox
						variant="disabled"
						id={ `check1-disabled` }
						aria-labelledby={ `label-check1-disabled` }
						checked={ 'indeterminate' }
					/>
					<Label
						sx={ { m: 0, ml: 2 } }
						htmlFor={ `check1-disabled` }
						id={ `label-check1-disabled` }
					>
						This option
					</Label>
				</Flex>
			</Form.Fieldset>

			<Text>
				Reference:{ ' ' }
				<a href="https://css-tricks.com/indeterminate-checkboxes/">Indeterminate Checkboxes</a>
			</Text>
		</Form.Root>
	);
};
