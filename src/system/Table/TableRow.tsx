/**
 * External dependencies
 */
import { KeyboardEvent, ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { TableCell } from './TableCell';

interface TableCellProps extends React.HTMLProps< HTMLTableCellElement > {
	cells?: ReactNode[];
	children?: ReactNode;
	head?: boolean;
	onClick?: () => void;
	sx?: ThemeUIStyleObject;
}

export const TableRow = ( { onClick, head = false, cells = [], children, sx }: TableCellProps ) => {
	const hoverStyles: ThemeUIStyleObject = {
		cursor: 'pointer',
		'&:hover': {
			bg: 'hover',
			borderRadius: 2,
		},
		...sx,
	};

	function handleKeyPress( evt: KeyboardEvent< HTMLTableRowElement > ) {
		if ( onClick && evt.key === 'Enter' ) {
			onClick();
		}
	}

	return (
		<tr
			sx={ onClick ? hoverStyles : sx }
			onClick={ onClick }
			tabIndex={ onClick ? 0 : undefined }
			onKeyDown={ handleKeyPress }
		>
			{ cells.map( ( cell, index ) => (
				<TableCell key={ index } head={ head }>
					{ cell }
				</TableCell>
			) ) }

			{ children }
		</tr>
	);
};
