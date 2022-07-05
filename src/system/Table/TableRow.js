/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { TableCell } from './TableCell';

const TableRow = ( { onClick, head = false, rowHead = false, cells } ) => {
	const hoverStyles = onClick
		? { cursor: 'pointer', '&:hover': { bg: 'hover', borderRadius: 2 } }
		: {};

	const handleKeyPress = e => {
		if ( e.key === 'Enter' && onClick ) {
			onClick();
		}
	};

	return (
		<tr
			sx={ hoverStyles }
			onClick={ onClick }
			tabIndex={ onClick ? 0 : null }
			onKeyDown={ handleKeyPress }
		>
			{ cells.map( ( cell, index ) => (
				<TableCell key={ index } cell={ cell } head={ head } isRowHead={ index === 0 && rowHead } />
			) ) }
		</tr>
	);
};

TableRow.propTypes = {
	cells: PropTypes.array,
	head: PropTypes.bool,
	onClick: PropTypes.func,
	rowHead: PropTypes.bool,
};

export { TableRow };
