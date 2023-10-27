/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdSearch } from '@react-icons/all-files/md/MdSearch';

export const FormSelectSearch = React.forwardRef( ( props, forwardRef ) => (
	<MdSearch
		ref={ forwardRef }
		aria-hidden="true"
		size={ 24 }
		sx={ {
			position: 'absolute',
			pr: 2,
			left: 3,
			pointerEvents: 'none',
		} }
		{ ...props }
	/>
) );

FormSelectSearch.displayName = 'FormSelectSearch';
