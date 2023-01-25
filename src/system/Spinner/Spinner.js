/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Spinner as ThemeSpinner } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Spinner = React.forwardRef(
	( { sx, className = null, color = 'icon.helper', ...props }, forwardRef ) => (
		<ThemeSpinner
			strokeWidth={ 2 }
			sx={ {
				fill: 'none',
				color,
			} }
			className={ classNames( 'vip-spinner-component', className ) }
			ref={ forwardRef }
			{ ...props }
		/>
	)
);

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
	color: PropTypes.string,
};

export { Spinner };
