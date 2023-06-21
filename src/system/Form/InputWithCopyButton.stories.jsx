/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Form } from '..';

export default {
	title: 'Form/InputWithCopyButton',
};

export const Default = () => (
	<Form.Root>
		<Form.InputWithCopyButton
			placeholder="Your input here..."
			label="Always add a label to inputs"
			forLabel="input-simple"
		/>
	</Form.Root>
);
