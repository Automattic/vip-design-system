/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Button } from './Button';
import * as Form from './Form';
import * as NewForm from './NewForm';

export default {
	title: 'Design System/Control Sizes',
	component: Button,
};

/**
 * This story demonstrates the new two-size system for all form controls.
 * All interactive elements now support 'large' (40px, default) and 'small' (32px, compact) sizes
 * to ensure perfect visual alignment when used together.
 */
export const SizeComparison = () => (
	<div>
		<h2>Control Size System</h2>
		<p>
			All form controls and buttons now support two standardized sizes:
		</p>
		<ul>
			<li><strong>Large (40px)</strong> - Default size, better for touch interfaces and accessibility</li>
			<li><strong>Small (32px)</strong> - Compact size for dense UIs and space-constrained layouts</li>
		</ul>
		<p>
			Both sizes maintain a consistent 14px font size for readability across all variants.
		</p>

		<hr sx={ { my: 4 } } />

		<h3>Large Size (40px) - Default</h3>
		<p>This is the default size for all components. Use for standard forms and interfaces.</p>
		
		<h4>Button + Input Alignment</h4>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4 } }>
			<Form.Input
				size="large"
				label="Email Address"
				forLabel="email-large"
				placeholder="Enter your email"
			/>
			<Button size="large">Submit</Button>
		</div>

		<h4>Button + Select Alignment</h4>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4 } }>
			<NewForm.Select
				size="large"
				label="Choose Option"
				forLabel="select-large"
				options={ [
					{ value: 'option1', label: 'Option 1' },
					{ value: 'option2', label: 'Option 2' },
					{ value: 'option3', label: 'Option 3' },
				] }
			/>
			<Button size="large" variant="secondary">Apply</Button>
		</div>

		<h4>Input + Button + Button Alignment</h4>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4 } }>
			<Form.Input
				size="large"
				label="Search"
				forLabel="search-large"
				placeholder="Search..."
			/>
			<Button size="large" variant="primary">Search</Button>
			<Button size="large" variant="ghost">Clear</Button>
		</div>

		<hr sx={ { my: 4 } } />

		<h3>Small Size (32px) - Compact</h3>
		<p>Use the small size for compact UIs, toolbars, table filters, and space-constrained layouts.</p>

		<h4>Button + Input Alignment</h4>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4 } }>
			<Form.Input
				size="small"
				label="Email Address"
				forLabel="email-small"
				placeholder="Enter your email"
			/>
			<Button size="small">Submit</Button>
		</div>

		<h4>Button + Select Alignment</h4>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4 } }>
			<NewForm.Select
				size="small"
				label="Choose Option"
				forLabel="select-small"
				options={ [
					{ value: 'option1', label: 'Option 1' },
					{ value: 'option2', label: 'Option 2' },
					{ value: 'option3', label: 'Option 3' },
				] }
			/>
			<Button size="small" variant="secondary">Apply</Button>
		</div>

		<h4>Input + Button + Button Alignment</h4>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4 } }>
			<Form.Input
				size="small"
				label="Search"
				forLabel="search-small"
				placeholder="Search..."
			/>
			<Button size="small" variant="primary">Search</Button>
			<Button size="small" variant="ghost">Clear</Button>
		</div>

		<hr sx={ { my: 4 } } />

		<h3>All Button Variants - Size Comparison</h3>
		<div sx={ { display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: 3, alignItems: 'center' } }>
			<div sx={ { fontWeight: 'bold' } }>Variant</div>
			<div sx={ { fontWeight: 'bold' } }>Large (40px)</div>
			<div sx={ { fontWeight: 'bold' } }>Small (32px)</div>

			<div>Primary</div>
			<Button size="large">Large Primary</Button>
			<Button size="small">Small Primary</Button>

			<div>Secondary</div>
			<Button size="large" variant="secondary">Large Secondary</Button>
			<Button size="small" variant="secondary">Small Secondary</Button>

			<div>Tertiary</div>
			<Button size="large" variant="tertiary">Large Tertiary</Button>
			<Button size="small" variant="tertiary">Small Tertiary</Button>

			<div>Ghost</div>
			<Button size="large" variant="ghost">Large Ghost</Button>
			<Button size="small" variant="ghost">Small Ghost</Button>

			<div>Display</div>
			<Button size="large" variant="display">Large Display</Button>
			<Button size="small" variant="display">Small Display</Button>
		</div>

		<hr sx={ { my: 4 } } />

		<h3>Complex Form Layout - Large Size</h3>
		<div sx={ { maxWidth: 600 } }>
			<Form.Input
				size="large"
				label="Full Name"
				forLabel="name-large"
				placeholder="John Doe"
			/>
			<NewForm.Select
				size="large"
				label="Country"
				forLabel="country-large"
				options={ [
					{ value: 'us', label: 'United States' },
					{ value: 'uk', label: 'United Kingdom' },
					{ value: 'ca', label: 'Canada' },
				] }
			/>
			<Form.Input
				size="large"
				label="Email"
				forLabel="email-form-large"
				placeholder="john@example.com"
				type="email"
			/>
			<div sx={ { display: 'flex', gap: 2, mt: 3 } }>
				<Button size="large" variant="primary">Submit Form</Button>
				<Button size="large" variant="ghost">Cancel</Button>
			</div>
		</div>

		<hr sx={ { my: 4 } } />

		<h3>Complex Form Layout - Small Size</h3>
		<div sx={ { maxWidth: 600 } }>
			<Form.Input
				size="small"
				label="Full Name"
				forLabel="name-small"
				placeholder="John Doe"
			/>
			<NewForm.Select
				size="small"
				label="Country"
				forLabel="country-small"
				options={ [
					{ value: 'us', label: 'United States' },
					{ value: 'uk', label: 'United Kingdom' },
					{ value: 'ca', label: 'Canada' },
				] }
			/>
			<Form.Input
				size="small"
				label="Email"
				forLabel="email-form-small"
				placeholder="john@example.com"
				type="email"
			/>
			<div sx={ { display: 'flex', gap: 2, mt: 3 } }>
				<Button size="small" variant="primary">Submit Form</Button>
				<Button size="small" variant="ghost">Cancel</Button>
			</div>
		</div>
	</div>
);

export const MixedSizesAntiPattern = () => (
	<div>
		<h2>❌ Anti-Pattern: Mixed Sizes</h2>
		<p sx={ { color: 'error', fontWeight: 'bold' } }>
			Avoid mixing different sizes in the same context. This creates visual inconsistency.
		</p>

		<h3>Wrong: Large Input + Small Button</h3>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4, p: 3, bg: 'notice.background.error', borderRadius: 2 } }>
			<Form.Input
				size="large"
				label="Search"
				forLabel="mixed-1"
				placeholder="Search..."
			/>
			<Button size="small">Search</Button>
		</div>

		<h3>Wrong: Small Input + Large Button</h3>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4, p: 3, bg: 'notice.background.error', borderRadius: 2 } }>
			<Form.Input
				size="small"
				label="Search"
				forLabel="mixed-2"
				placeholder="Search..."
			/>
			<Button size="large">Search</Button>
		</div>

		<hr sx={ { my: 4 } } />

		<h2>✅ Correct: Consistent Sizes</h2>
		<p sx={ { color: 'success', fontWeight: 'bold' } }>
			Always use the same size for all controls in a given context.
		</p>

		<h3>Correct: All Large</h3>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4, p: 3, bg: 'notice.background.success', borderRadius: 2 } }>
			<Form.Input
				size="large"
				label="Search"
				forLabel="correct-1"
				placeholder="Search..."
			/>
			<Button size="large">Search</Button>
		</div>

		<h3>Correct: All Small</h3>
		<div sx={ { display: 'flex', gap: 2, alignItems: 'flex-end', mb: 4, p: 3, bg: 'notice.background.success', borderRadius: 2 } }>
			<Form.Input
				size="small"
				label="Search"
				forLabel="correct-2"
				placeholder="Search..."
			/>
			<Button size="small">Search</Button>
		</div>
	</div>
);

