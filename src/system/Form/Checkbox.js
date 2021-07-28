/**
 * External dependencies
 */
 import { Checkbox as ThemeCheckbox } from 'theme-ui';
 import PropTypes from 'prop-types';
 
 const Checkbox = ( { disabled, ...props } ) => (
     <ThemeCheckbox disabled={ disabled } { ...props } />
 );
 
 Checkbox.propTypes = {
     disabled: PropTypes.bool,
 };
 
 export { Checkbox };
 