/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const Form = ( { children, ...props } ) => <form { ...props }>{ children }</form>;

Form.propTypes = {
	children: PropTypes.any,
};

Form.displayName = 'Form';

export { Form };
