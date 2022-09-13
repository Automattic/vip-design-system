/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = React.forwardRef( ( { sx, className, ...props }, forwardRef ) => (
	<table
		sx={ { width: '100%', minWidth: 1024, ...sx } }
		cellPadding={ 0 }
		cellSpacing={ 0 }
		className={ classNames( 'vip-table-component', className ) }
		ref={ forwardRef }
		{ ...props }
	/>
) );

Table.displayName = 'Table';

Table.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Table };
