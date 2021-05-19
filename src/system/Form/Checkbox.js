/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Checkbox as ThemeCheckbox } from 'theme-ui';
import PropTypes from 'prop-types';

const Checkbox = ( { disabled, ...props } ) => (
	<ThemeCheckbox sx={ { opacity: disabled ? 0.4 : 1 } } disabled={ disabled } { ...props } />
);

Checkbox.propTypes = {
	disabled: PropTypes.bool,
};

export { Checkbox };
