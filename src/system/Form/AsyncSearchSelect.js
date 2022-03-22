/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { withAsyncPaginate } from 'react-select-async-paginate';
 
 /**
  * Internal dependencies
  */
import { SearchSelect } from './SearchSelect';

// Asynchronous search select to load paginated results asynchronously
const CustomAsyncPaginate = withAsyncPaginate( SearchSelect );

const AsyncSearchSelect = ( { options, ...props } ) => (
	<CustomAsyncPaginate
		SelectComponent={ SearchSelect }
		loadOptions={ options }
		{ ...props }
	/>
);

AsyncSearchSelect.propTypes = {
	options: PropTypes.array,
};

export { AsyncSearchSelect };