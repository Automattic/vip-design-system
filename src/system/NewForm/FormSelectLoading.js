/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { keyframes } from '@emotion/react';

const kf = keyframes( {
	from: { transform: 'rotate(0deg)' },
	to: { transform: 'rotate(360deg) ' },
} );

export const FormSelectLoading = React.forwardRef( ( props, forwardRef ) => (
	<AiOutlineLoading3Quarters
		ref={ forwardRef }
		aria-hidden="true"
		size={ 18 }
		sx={ {
			position: 'absolute',
			right: 40,
			pointerEvents: 'none',
			animation: `${ kf } 1s infinite linear`,
			opacity: 0.5,
		} }
		{ ...props }
	/>
) );

FormSelectLoading.displayName = 'FormSelectLoading';
