/** @jsxImportSource theme-ui */
// we'll need jsxImportSource for the sx prop when used with html elements

/**
 * External dependencies
 */
import classNames, { Argument } from 'classnames';
import { forwardRef, ReactNode, Ref, TableHTMLAttributes, useId } from 'react';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';
import { screenReaderTextClass } from '../ScreenReaderText/ScreenReaderText';

import type { ThemeUIStyleObject } from 'theme-ui';

export interface TableProps extends Omit< TableHTMLAttributes< HTMLTableElement >, 'className' > {
	/** Accessible caption describing the table contents. A console warning is shown if omitted. */
	caption?: string;
	/** Table content (thead, tbody, tr elements, etc.). */
	children?: ReactNode;
	/** Additional CSS class name(s) for the table container. */
	className?: Argument;
	/** Theme UI style overrides applied to the table element. */
	sx?: ThemeUIStyleObject;
}

/**
 * A horizontally scrollable data table with an accessible caption.
 * Wraps a native HTML table in a scrollable region with proper ARIA labeling.
 */
export const Table = forwardRef< HTMLTableElement, TableProps >(
	( { sx, className, children, caption, ...props }: TableProps, ref: Ref< HTMLTableElement > ) => {
		if ( ! caption ) {
			// eslint-disable-next-line no-console
			console.warn( '[A11Y] Please, add a caption to your table.' );
		}

		const captionId = useId();

		return (
			<Box
				className={ classNames( 'vip-table-component', className ) }
				sx={ { width: '100%', maxWidth: '100vw', overflowX: 'auto' } }
				{ ...( caption ? { role: 'region', 'aria-labelledby': captionId, tabIndex: 0 } : {} ) }
			>
				<table
					sx={ { width: '100%', minWidth: '1024px', borderSpacing: 0, ...sx } }
					className={ classNames( 'vip-table-component-element', className ) }
					ref={ ref }
					{ ...props }
				>
					{ caption && (
						<caption id={ captionId } sx={ screenReaderTextClass }>
							{ caption }
						</caption>
					) }
					{ children }
				</table>
			</Box>
		);
	}
);

Table.displayName = 'Table';
