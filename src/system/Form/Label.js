/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Label = React.forwardRef( ( props, forwardRef ) => (
	<Heading
		variant="h4"
		as="label"
		sx={ { display: 'block', mb: 2, color: 'muted' } }
		ref={ forwardRef }
		{ ...props }
	/>
) );

Label.displayName = 'Label';

export { Label };
