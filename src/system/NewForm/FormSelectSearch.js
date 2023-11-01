/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdSearch } from 'react-icons/md';

export const FormSelectSearch = React.forwardRef( ( props, forwardRef ) => (
	<MdSearch
		ref={ forwardRef }
		aria-hidden="true"
		size={ 24 }
		sx={ {
			position: 'absolute',
			pr: 2,
			left: 4,
			pointerEvents: 'none',
		} }
		{ ...props }
	/>
) );

FormSelectSearch.displayName = 'FormSelectSearch';
