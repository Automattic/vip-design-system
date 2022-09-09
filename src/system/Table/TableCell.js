/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading, Box } from '../';

const TableCell = ( { head, children, ...rest } ) => {
	const sx = {
		borderBottom: '1px solid',
		borderTop: head ? '1px solid' : 'none',
		// borderColor should come after borderTop so it can override it
		borderColor: 'borders.2',
		fontWeight: 'body',
		px: 3,
		py: 2,
		textAlign: 'left',
		'&:first-of-type': {
			pl: 5,
		},
		...rest.sx,
	};

	return (
		<Box as={ head ? 'th' : 'td' } { ...{ ...rest, sx } }>
			{ head ? (
				<Heading variant="caps" as="div" sx={ { mb: 0 } }>
					{ children }
				</Heading>
			) : (
				children
			) }
		</Box>
	);
};

TableCell.propTypes = {
	children: PropTypes.node,
	head: PropTypes.bool,
};

export { TableCell };
