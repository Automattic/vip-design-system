/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Form, Label } from '..';

export default {
	title: 'Form/Label',
};

const DefaultComponent = props => (
	<Form.Root>
		<Label { ...props }>Label</Label>
	</Form.Root>
);

export const Default = () => {
	return (
		<>
			<DefaultComponent />
		</>
	);
};

export const Required = () => {
	const args = {
		required: true,
	};

	return (
		<>
			<DefaultComponent { ...args } />
		</>
	);
};
