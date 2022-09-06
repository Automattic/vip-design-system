/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

const NewForm = ( { children } ) => {
	return <>{ children }</>;
};

NewForm.propTypes = {
	children: PropTypes.node,
};

export { NewForm };
