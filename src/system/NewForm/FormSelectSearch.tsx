/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdSearch } from 'react-icons/md';
import { ThemeUIStyleObject } from 'theme-ui';

interface FormSelectSearchProps {
	sx?: ThemeUIStyleObject;
}

const searchStyles: ThemeUIStyleObject = {
	position: 'absolute',
	pr: 2,
	left: 3,
	pointerEvents: 'none',
};

export const FormSelectSearch = React.forwardRef< SVGSVGElement, FormSelectSearchProps >(
	( props, forwardRef ) => (
		<div ref={ forwardRef as React.RefObject< HTMLDivElement > }>
			<MdSearch aria-hidden="true" size={ 24 } sx={ searchStyles } { ...props } />
		</div>
	)
);

FormSelectSearch.displayName = 'FormSelectSearch';
