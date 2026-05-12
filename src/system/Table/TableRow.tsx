/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * External dependencies
 */
import { KeyboardEvent, ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { TableCell } from './TableCell';

export interface TableRowProps extends React.HTMLProps< HTMLTableRowElement > {
	/** Array of cell contents to render as TableCell components.
	 * @default []
	 */
	cells?: ReactNode[];
	/** Custom row content rendered after the cells array. */
	children?: ReactNode;
	/** Whether this row is a header row, rendering th elements instead of td.
	 * @default false
	 */
	head?: boolean;
	/** Click handler that makes the row interactive with hover styles and keyboard support. */
	onClick?: () => void;
	/** Theme UI style overrides. */
	sx?: ThemeUIStyleObject;
}

/**
 * A table row that supports both header and body rendering.
 * When an onClick handler is provided, the row becomes interactive with hover styles and keyboard navigation.
 */
export const TableRow = ( {
	onClick,
	head = false,
	cells = [],
	children,
	sx,
	...rest
}: TableRowProps ) => {
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
			{ ...rest }
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
