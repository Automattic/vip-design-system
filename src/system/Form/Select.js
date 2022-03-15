/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
  * Internal dependencies
  */
import { SearchSelect, AsyncSearchSelect } from './SearchSelect';
import { InlineSelect } from './InlineSelect';

const Select = ( { isMulti = false, isInline, options, label, isSearch, isAsync, loadOptions, ...props } ) => {
	if ( isInline ) {
		return <InlineSelect isMulti={ isMulti } label={ label } options={ options } { ...props } />;
	}
	else if ( isAsync ) {
		return <AsyncSearchSelect options={ loadOptions } { ...props } />
	}
	return <SearchSelect isMulti={ isMulti } label={ label } options={ options } { ...props } />;
};

Select.propTypes = {
	isInline: PropTypes.bool,
	isMulti: PropTypes.bool,
	isSearch: PropTypes.bool,
	label: PropTypes.string,
	options: PropTypes.array,
};

export { Select };
