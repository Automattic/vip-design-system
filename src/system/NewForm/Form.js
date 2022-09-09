/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

const Form = React.forwardRef( ( { children, ...props }, forwardRef ) => (
	<form ref={ forwardRef } { ...props }>
		{ children }
	</form>
) );

Form.propTypes = {
	children: PropTypes.any,
};

Form.displayName = 'Form';

export { Form };
