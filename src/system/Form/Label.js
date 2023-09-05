/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'theme-ui';
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

const Label = React.forwardRef(
	( { sx, children, required, as = 'label', ...rest }, forwardRef ) => (
		<Box
			as={ as }
			sx={ {
				all: 'unset',
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
		</Box>
	)
);

Label.propTypes = {
	children: PropTypes.any,
	required: PropTypes.bool,
	sx: PropTypes.object,
	as: PropTypes.node,
};

Label.displayName = 'Label';

export { Label };
