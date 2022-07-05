/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading, Box } from '../';

const TableCell = ( { head, isRowHead, cell, ...rest } ) => {
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
				borderBottom: '1px solid',
				borderColor: 'border',
				borderTop: head ? '1px solid' : 'none',
				fontWeight: 'body',
				px: 3,
				py: 2,
				textAlign: 'left',
				'&:first-of-type': {
					pl: 5,
				},
			} }
			{ ...rest }
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
	cell: PropTypes.node,
};

export { TableCell };
