/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Spinner as ThemeSpinner } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Spinner = ( { sx, className = null, ...props } ) => (
	<ThemeSpinner
		strokeWidth={ 2 }
		sx={ {
			fill: 'none',
			color: 'primary',
		} }
		className={ classNames( 'vip-spinner-component', className ) }
		{ ...props }
	/>
);

Spinner.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Spinner };
