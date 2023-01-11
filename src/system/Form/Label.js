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

export const baseLabelColor = 'input.label.default';
export const baseLabelStyle = {
	fontWeight: 500,
	fontSize: 2,
	lineHeight: 1.5,
	color: baseLabelColor,
};

const Label = React.forwardRef( ( { sx, children, required, ...rest }, forwardRef ) => (
	<label
		sx={ {
			...baseLabelStyle,
			display: 'block',
			mb: 2,
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
