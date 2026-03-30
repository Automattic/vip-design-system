/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * External dependencies
 */
import { ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../';

export interface TableCellProps extends React.HTMLProps< HTMLTableCellElement > {
	/** The content to display inside the cell. */
	children: ReactNode;
	/** Whether this cell is a header cell (renders as th with bold styling). */
	head?: boolean;
	/** Theme UI style overrides. */
	sx?: ThemeUIStyleObject;
}

/**
 * A table cell that renders as either a th or td element based on the head prop.
 * Header cells display bold text with themed heading color.
 */
export const TableCell = ( { children, head, sx, ...rest }: TableCellProps ) => {
	const style: ThemeUIStyleObject = {
		borderBottom: '1px solid',
		borderTop: head ? '1px solid' : 'none',
		// borderColor should come after borderTop so it can override it
		borderColor: 'table.border',
		fontWeight: 'body',
		px: 3,
		py: 2,
		textAlign: 'left',
		...sx,
	};

	return (
		<Box { ...rest } as={ head ? 'th' : 'td' } ref={ undefined } sx={ style }>
			{ head ? (
				<span sx={ { mb: 0, color: 'table.heading', fontSize: 2, fontWeight: 'bold' } }>
					{ children }
				</span>
			) : (
				children
			) }
		</Box>
	);
};

TableCell.displayName = 'TableCell';
