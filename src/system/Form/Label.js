/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { RequiredLabel } from './RequiredLabel';
import { getColor } from '../theme/getColor';

const Label = React.forwardRef( ( { sx, children, required, ...rest }, forwardRef ) => (
	<label
		sx={ {
			fontWeight: 500,
			fontSize: 2,
			lineHeight: 1.5,
			display: 'block',
			mb: 2,
			color: getColor( 'text', 'primary' ),
			...sx,
		} }
		ref={ forwardRef }
		{ ...rest }
	>
		{ children }
		{ required && <RequiredLabel /> }
	</label>
) );

Label.propTypes = {
	children: PropTypes.any,
	required: PropTypes.bool,
	sx: PropTypes.object,
};

Label.displayName = 'Label';

export { Label };
