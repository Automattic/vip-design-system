/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx } from 'theme-ui';

const Table = props => (
	<div sx={ { overflowX: 'auto' } }>
		<table
			sx={ { width: '100%', minWidth: 1024 } }
			cellPadding={ 0 }
			cellSpacing={ 0 }
			{ ...props }
		/>
	</div>
);

export { Table };
