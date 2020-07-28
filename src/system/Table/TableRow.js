/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { Heading } from '../';

const TableRow = ( { onClick, head = false, cells } ) => {
	const hoverStyles = onClick
		? { cursor: 'pointer', '&:hover': { bg: 'hover', borderRadius: 2 } }
		: {};

	const CellElement = head ? 'th' : 'td';

	const handleKeyPress = ( e ) => {
		if ( e.key === 'Enter' && onClick ) {
			onClick();
		}
	};

	return (
		<tr sx={ hoverStyles } onClick={ onClick } tabIndex={ onClick ? 0 : null } onKeyDown={handleKeyPress}>
			{ cells.map( ( cell, index ) => (
				<CellElement
					key={ index }
					sx={ {
						px: 3,
						py: 2,
						textAlign: 'left',
						borderBottom: '1px solid',
						borderTop: head ? '1px solid' : 'none',
						borderColor: 'border',
						'&:first-child': {
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
				</CellElement>
			) ) }
		</tr>
	);
};

TableRow.propTypes = {
	onClick: PropTypes.func,
	head: PropTypes.bool,
	cells: PropTypes.array,
};

export { TableRow };
