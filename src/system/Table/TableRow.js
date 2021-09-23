/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading, Box } from '../';

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

const TableCell = ( { head, isRowHead, cell } ) => {
	let scope = null;
	if ( head ) {
		scope = 'col';
	} else if ( isRowHead ) {
		scope = 'row';
	}
	return (
		<Box
			as={ isRowHead || head ? 'th' : 'td' }
			scope={ scope }
			sx={ {
				px: 3,
				py: 2,
				textAlign: 'left',
				borderBottom: '1px solid',
				fontWeight: 'body',
				borderTop: head ? '1px solid' : 'none',
				borderColor: 'border',
				'&:first-of-type': {
					pl: 5,
				},
			} }
		>
			{ head ? (
				<Heading variant="caps" as="div" sx={ { mb: 0 } }>
					{ cell }
				</Heading>
			) : (
				cell
			) }
		</Box>
	);
};

TableCell.propTypes = {
	head: PropTypes.bool,
	isRowHead: PropTypes.bool,
	cell: PropTypes.array,
};

TableRow.propTypes = {
	onClick: PropTypes.func,
	head: PropTypes.bool,
	cells: PropTypes.array,
	rowHead: PropTypes.bool,
};

export { TableRow };