/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { keyframes } from '@emotion/react';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { inputBaseText } from '../Form/Input.styles';

const kf = keyframes( {
	from: { transform: 'rotate(0deg)' },
	to: { transform: 'rotate(360deg)' },
} );

interface FormSelectLoadingProps {
	sx?: ThemeUIStyleObject;
	ref?: React.Ref< HTMLDivElement >;
}

const loadingStyles: ThemeUIStyleObject = {
	position: 'absolute',
	right: 3,
	top: '9px',
	pointerEvents: 'none',
	animation: `${ kf } 1s infinite linear`,
	opacity: 0.5,
	svg: {
		fill: inputBaseText,
	},
};

export const FormSelectLoading = ( { sx = {}, ref, ...rest }: FormSelectLoadingProps ) => (
	<div ref={ ref }>
		<AiOutlineLoading3Quarters
			aria-hidden="true"
			size={ 18 }
			sx={ {
				...loadingStyles,
				...sx,
			} }
			{ ...rest }
		/>
	</div>
);

FormSelectLoading.displayName = 'FormSelectLoading';
