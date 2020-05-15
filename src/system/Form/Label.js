/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Label = props => (
	<Heading
		variant="caps"
		as="label"
		sx={{ display: 'block', mb: 2 }}
		{...props}
	/>
);

export { Label };
