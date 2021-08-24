/**
 * External dependencies
 */
 import PropTypes from 'prop-types';
 
 /**
  * Internal dependencies
  */
 import { SearchSelect } from './SearchSelect';
 import { InlineSelect } from './InlineSelect';
 
 const Select = ( { isMulti = false, isInline, options, label, isSearch, ...props } ) => {
	 if ( isInline ) {
		 return <InlineSelect isMulti={ isMulti } label={ label } options={ options } { ...props } />;
	 }
	 return <SearchSelect isMulti={ isMulti } label={ label } options={ options } { ...props } />;
 };
 
 Select.propTypes = {
	 isMulti: PropTypes.bool,
	 isInline: PropTypes.bool,
	 isSearch: PropTypes.bool,
	 options: PropTypes.array,
	 label: PropTypes.string,
 };
 
 export { Select };