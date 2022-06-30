/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Validation = ( { children, isValid, ...props } ) => {
	const Icon = isValid ? MdCheckCircle : MdErrorOutline;

	return (
		<Heading
			variant="h5"
			as="p"
			sx={ { color: isValid ? 'success' : 'error', display: 'flex', alignItems: 'center' } }
			{ ...props }
		>
			<Icon sx={ { mr: 1 } } />
			{ children }
		</Heading>
	);
};

Validation.propTypes = {
	children: PropTypes.node,
	isValid: PropTypes.bool,
};

export { Validation };
