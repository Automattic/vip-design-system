/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

const errorColor = 'notice.link.error.default';
const helperColor = 'texts.helper';

const Validation = ( { children, isValid, describedId = null, ...props } ) => {
	const Icon = isValid ? MdCheckCircle : MdErrorOutline;

	return (
		<p
			sx={ {
				color: isValid ? helperColor : errorColor,
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
