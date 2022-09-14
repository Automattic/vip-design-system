/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { Radio as ThemeRadio } from 'theme-ui';
import PropTypes from 'prop-types';

const Radio = React.forwardRef( ( { disabled, ...props }, forwardRef ) => (
	<ThemeRadio
		sx={ { opacity: disabled ? 0.4 : 1 } }
		disabled={ disabled }
		ref={ forwardRef }
		{ ...props }
	/>
) );

Radio.displayName = 'Radio';

Radio.propTypes = {
	disabled: PropTypes.bool,
};

export { Radio };
