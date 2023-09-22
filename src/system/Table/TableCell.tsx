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
	children: ReactNode;
	head?: boolean;
	sx?: ThemeUIStyleObject;
}

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
