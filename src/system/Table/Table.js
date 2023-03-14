/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { screenReaderTextClass } from '../ScreenReaderText/ScreenReaderText';
import { Box } from '../';
import { generateId } from '../utils/random';

const Table = React.forwardRef(
	( { sx, className, children, caption = null, ...props }, forwardRef ) => {
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
				ariaLabelledby={ captionId }
				// Because this container is scrollable, it needs to be focusable.
				// A tabIndex value of 0 makes it focusable by keyboard and does not
				// interfere with the tab order.
				tabIndex={ 0 }
			>
				<table
					sx={ { width: '100%', minWidth: '1024px', borderSpacing: 0, ...sx } }
					className={ classNames( 'vip-table-component-element', className ) }
					ref={ forwardRef }
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

Table.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
	children: PropTypes.any,
	caption: PropTypes.string.isRequired,
};

export { Table };
