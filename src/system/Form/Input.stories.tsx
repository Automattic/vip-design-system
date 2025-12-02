/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import * as Form from '../NewForm';

export default {
	title: 'Form/Input',
};

export const Default = () => (
	<Form.Root>
		<Form.Input
			placeholder="Your input here..."
			label="Always add a label to inputs"
			forLabel="input-simple"
		/>

		<hr sx={ { my: 4 } } />

		<Form.Input
			forLabel="input-with-error"
			label="Error Input"
			errorMessage="Please type numeric characters only"
			hasError
		/>

		<hr sx={ { my: 4 } } />

		<Form.Input forLabel="input-with-required" label="Required" required />

		<hr sx={ { my: 4 } } />

		<Form.Label htmlFor="input-with-custom-label">Custom Label outside the Input</Form.Label>
		<Form.Input forLabel="input-with-custom-label" required />
		<Form.Input forLabel="input-readonly" readOnly value="This is a readonly input" />
	</Form.Root>
);

export const SizeVariants = () => (
	<Form.Root>
		<h3>Size Variants</h3>
		<p>Inputs support two sizes: large (40px, default) and small (32px, compact)</p>

		<h4>Large (Default - 40px)</h4>
		<Form.Input
			size="large"
			placeholder="Large input field..."
			label="Large Input"
			forLabel="input-large"
		/>

		<hr sx={ { my: 4 } } />

		<h4>Small (Compact - 32px)</h4>
		<Form.Input
			size="small"
			placeholder="Small input field..."
			label="Small Input"
			forLabel="input-small"
		/>

		<hr sx={ { my: 4 } } />

		<h4>Side by Side Comparison</h4>
		<div sx={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 } }>
			<Form.Input
				size="large"
				placeholder="Large"
				label="Large"
				forLabel="input-large-2"
			/>
			<Form.Input
				size="small"
				placeholder="Small"
				label="Small"
				forLabel="input-small-2"
			/>
		</div>
	</Form.Root>
);
