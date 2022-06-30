/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = ( { sx, className, ...props } ) => (
	<table
		sx={ { width: '100%', minWidth: 1024, ...sx } }
		cellPadding={ 0 }
		cellSpacing={ 0 }
		className={ classNames( 'vip-table-component', className ) }
		{ ...props }
	/>
);

Table.propTypes = {
	sx: PropTypes.object,
	className: PropTypes.any,
};

export { Table };
