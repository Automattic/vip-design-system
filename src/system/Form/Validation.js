/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

/**
 * Internal dependencies
 */

const Validation = ( { children, isValid, describedId = null, ...props } ) => {
	const Icon = isValid ? MdCheckCircle : MdErrorOutline;
	const IconLabel = isValid ? 'Valid' : 'Invalid';

	return (
		<p
			sx={ {
				color: isValid ? 'success' : 'error',
				display: 'flex',
				alignItems: 'center',
				m: 0,
				fontSize: 1,
			} }
			id={ describedId ? `describe-${ describedId }-validation` : undefined }
			{ ...props }
		>
			<Icon sx={ { mr: 1 } } aria-hidden="true" />
			{ children }
		</p>
	);
};

Validation.propTypes = {
	children: PropTypes.node,
	isValid: PropTypes.bool,
	describedId: PropTypes.string,
};

export { Validation };
