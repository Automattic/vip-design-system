/**
 * External dependencies
 */
import { forwardRef, ReactNode, Ref, useMemo } from 'react';
import classNames, { Argument } from 'classnames';
import type { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { screenReaderTextClass } from '../ScreenReaderText/ScreenReaderText';
import { Box } from '../';
import { generateId } from '../utils/random';

export interface TableProps {
	caption?: string;
	children?: ReactNode;
	className?: Argument;
	sx?: ThemeUIStyleObject;
}

export const Table = forwardRef< HTMLTableElement, TableProps >(
	( { sx, className, children, caption, ...props }: TableProps, ref: Ref< HTMLTableElement > ) => {
		if ( ! caption ) {
			// eslint-disable-next-line no-console
			console.warn( '[A11Y] Please, add a caption to your table.' );
		}

		const captionId = useMemo( () => `table_caption_${ generateId() }`, [] );

		return (
			<Box
				className={ classNames( 'vip-table-component', className ) }
				sx={ { width: '100%', overflowX: 'auto' } }
				role="region"
				aria-labelledby={ captionId }
				tabIndex={ 0 }
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
