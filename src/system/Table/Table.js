/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const Table = ( { sx, ...props } ) => (
	<div sx={ { overflowX: 'auto' } }>
		<table
			sx={ { width: '100%', minWidth: 1024, ...sx } }
			cellPadding={ 0 }
			cellSpacing={ 0 }
			{ ...props }
		/>
	</div>
);

Table.propTypes = {
	sx: PropTypes.object,
};

export { Table };
