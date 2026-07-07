/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdSearch } from 'react-icons/md';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Box } from '../Box/Box';

interface FormSelectSearchProps {
	sx?: ThemeUIStyleObject;
}

const wrapperStyles: ThemeUIStyleObject = {
	position: 'absolute',
	left: 3,
};

const searchStyles: ThemeUIStyleObject = {
	pr: 2,
	pointerEvents: 'none',
};

export const FormSelectSearch = React.forwardRef< SVGSVGElement, FormSelectSearchProps >(
	( props, forwardRef ) => (
		<Box ref={ forwardRef as React.RefObject< HTMLDivElement > } sx={ wrapperStyles }>
			<MdSearch aria-hidden="true" size={ 24 } sx={ searchStyles } { ...props } />
		</Box>
	)
);

FormSelectSearch.displayName = 'FormSelectSearch';
