/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';

/**
 * Internal dependencies
 */
import { baseControlBorderStyle as borderStyle } from '../Form/Input.styles';

export const FormSelectArrow = React.forwardRef( ( props, forwardRef ) => (
	<MdExpandMore
		ref={ forwardRef }
		aria-hidden="true"
		size={ 24 }
		sx={ {
			position: 'absolute',
			paddingLeft: 2,
			borderLeftWidth: borderStyle.borderWidth,
			borderLeftStyle: borderStyle.borderStyle,
			borderLeftColor: borderStyle.borderColor,
			right: 3,
			top: '7px',
			pointerEvents: 'none',
			svg: {
				fill: borderStyle.borderColor,
			},
		} }
		{ ...props }
	/>
) );

FormSelectArrow.displayName = 'FormSelectArrow';
