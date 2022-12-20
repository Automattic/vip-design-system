/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import { baseLabelStyle } from '../Form/Label';

const Legend = React.forwardRef( ( { children, className, sx = {}, ...props }, forwardRef ) => (
	<legend
		ref={ forwardRef }
		className={ classNames( 'vip-form-legend-component', className ) }
		sx={ {
			all: 'unset',
			...baseLabelStyle,
			mb: 0,
			...sx,
		} }
		{ ...props }
	>
		{ children }
	</legend>
) );

Legend.propTypes = {
	children: PropTypes.any,
	sx: PropTypes.any,
	className: PropTypes.any,
};

Legend.displayName = 'Legend';

export { Legend };
