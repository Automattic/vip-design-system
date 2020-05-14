/** @jsx jsx */
import { jsx } from 'theme-ui';

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
