/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { useState } from 'react';

import { Form, Notice } from '..';

export default {
	title: 'Form/InputWithCopyButton',
};

export const Default = () => {
	const [ copiedText, setCopiedText ] = useState( '' );
	return (
		<Form.Root>
			{ copiedText && (
				<Notice variant="success" sx={ { mb: 4 } }>
					Input successfully copied value! <strong>{ copiedText }</strong>
				</Notice>
			) }
			<Form.InputWithCopyButton
				placeholder="Your input here..."
				label="Always add a label to inputs"
				forLabel="input-simple"
				copyHandler={ value => setCopiedText( value ) }
			/>
			<Form.InputWithCopyButton
				value="Copy me!"
				label="This is a readonly input"
				forLabel="input-simple"
				readOnly
				copyHandler={ value => setCopiedText( value ) }
			/>
		</Form.Root>
	);
};
