/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { screenReaderTextClass } from '../ScreenReaderText/ScreenReaderText';

const Table = React.forwardRef(
	( { sx, className, children, caption = null, ...props }, forwardRef ) => {
		if ( ! caption ) {
			// eslint-disable-next-line no-console
			console.warn( '[A11Y] Please, add a caption to your table.' );
		}

		return (
			<table
				sx={ { width: '100%', minWidth: 1024, borderSpacing: 0, ...sx } }
				className={ classNames( 'vip-table-component', className ) }
				ref={ forwardRef }
				{ ...props }
			>
				{ caption && <caption sx={ screenReaderTextClass }>{ caption }</caption> }
				{ children }
			</table>
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
