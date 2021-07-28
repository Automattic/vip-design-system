/**
 * External dependencies
 */
import { Radio as ThemeRadio } from 'theme-ui';
import PropTypes from 'prop-types';

const Radio = ( { disabled, sx, ...props } ) => (
	<ThemeRadio sx={ { opacity: disabled ? 0.4 : 1, ...sx } } disabled={ disabled } { ...props } />
);

Radio.propTypes = {
	disabled: PropTypes.bool,
	sx: PropTypes.object,
};

export { Radio };
