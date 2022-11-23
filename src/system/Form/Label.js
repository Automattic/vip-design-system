/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const Label = React.forwardRef( ( { sx, ...rest }, forwardRef ) => (
	<label
		sx={ {
			fontWeight: 500,
			fontSize: 2,
			lineHeight: 1.5,
			display: 'block',
			mb: 2,
			color: 'muted',
			...sx,
		} }
		ref={ forwardRef }
		{ ...rest }
	/>
) );

Label.displayName = 'Label';

export { Label };
