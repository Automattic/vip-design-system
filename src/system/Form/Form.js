/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { FormSelect } from './FormSelect';

const Form = ( { children } ) => {
	return <>{ children }</>;
};

Form.Select = FormSelect;

Form.propTypes = {
	children: PropTypes.node,
};

export { Form };
