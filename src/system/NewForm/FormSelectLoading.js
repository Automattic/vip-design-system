/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

/**
 * Internal dependencies
 */
import { inputBaseText } from '../Form/Input.styles';

const kf = keyframes( {
	from: { transform: 'rotate(0deg)' },
	to: { transform: 'rotate(360deg) ' },
} );

export const FormSelectLoading = React.forwardRef( ( { sx = {}, ...rest }, forwardRef ) => (
	<AiOutlineLoading3Quarters
		ref={ forwardRef }
		aria-hidden="true"
		size={ 18 }
		sx={ {
			position: 'absolute',
			right: 3,
			pointerEvents: 'none',
			animation: `${ kf } 1s infinite linear`,
			opacity: 0.5,
			svg: {
				fill: inputBaseText,
			},
			...sx,
		} }
		{ ...rest }
	/>
) );

FormSelectLoading.propTypes = {
	sx: PropTypes.object,
};

FormSelectLoading.displayName = 'FormSelectLoading';
