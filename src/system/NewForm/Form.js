/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Form = React.forwardRef( ( { children, className, ...props }, forwardRef ) => (
	<form
		ref={ forwardRef }
		className={ classNames( 'vip-form-component', className ) }
		noValidate
		{ ...props }
	>
		{ children }
	</form>
) );

Form.propTypes = {
	children: PropTypes.any,
	className: PropTypes.any,
};

Form.displayName = 'Form';

export { Form };
