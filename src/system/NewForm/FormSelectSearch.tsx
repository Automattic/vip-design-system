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
	ref?: React.Ref< HTMLDivElement >;
}

const wrapperStyles: ThemeUIStyleObject = {
	position: 'absolute',
	left: 3,
};

const searchStyles: ThemeUIStyleObject = {
	pr: 2,
	pointerEvents: 'none',
};

export const FormSelectSearch = ( { ref, sx, ...props }: FormSelectSearchProps ) => (
	<Box ref={ ref } sx={ wrapperStyles }>
		<MdSearch aria-hidden="true" size={ 24 } sx={ { ...searchStyles, ...sx } } { ...props } />
	</Box>
);

FormSelectSearch.displayName = 'FormSelectSearch';
