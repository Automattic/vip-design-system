/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { Heading } from '..';

const Validation = ( { children, isValid, ...props } ) => {
	const Icon = isValid ? MdCheckCircle : MdCheckCircle;

	return (
		<Heading variant="h5" as="p" sx={ { color: isValid ? 'green.50' : 'red.50' } } { ...props }>
			<Icon sx={ { mr: 1, position: 'relative', top: '0.125em' } } />
			{ children }
		</Heading>
	);
};

Validation.propTypes = {
	children: PropTypes.node,
	isValid: PropTypes.bool,
};

export { Validation };
