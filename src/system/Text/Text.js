/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Text as ThemeText } from 'theme-ui';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Text = ( { sx, className = null, ...props } ) => (
	<ThemeText
		as="p"
		sx={ {
			lineHeight: 1.5,
			marginBottom: 2,
			...sx,
		} }
		className={ classNames( 'vip-text-component', className ) }
		{ ...props }
	/>
);

Text.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Text };
