/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Radio as ThemeRadio } from 'theme-ui';
import PropTypes from 'prop-types';

const Radio = ( { disabled, ...props } ) => (
	<ThemeRadio sx={ { opacity: disabled ? 0.4 : 1 } } disabled={ disabled } { ...props } />
);

Radio.propTypes = {
	disabled: PropTypes.bool,
};

export { Radio };
