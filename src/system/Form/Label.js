/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Label = props => (
	<Heading
		variant="caps"
		as="label"
		sx={{ display: 'block', mb: 2, color: 'text' }}
		{...props}
	/>
);

export { Label };
