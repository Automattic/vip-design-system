/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

export const FormSelectArrow = React.forwardRef( ( props, forwardRef ) => (
	<MdExpandMore
		ref={ forwardRef }
		aria-hidden="true"
		size={ 24 }
		sx={ {
			position: 'absolute',
			paddingLeft: 2,
			borderLeftWidth: '1px',
			borderLeftStyle: 'solid',
			borderLeftColor: 'border',
			right: 2,
			pointerEvents: 'none',
		} }
		{ ...props }
	/>
) );

FormSelectArrow.displayName = 'FormSelectArrow';
