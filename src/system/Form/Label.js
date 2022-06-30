/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Label = props => (
	<Heading
		variant="h4"
		as="label"
		sx={ { display: 'block', mb: 2, color: 'muted' } }
		{ ...props }
	/>
);

export { Label };
