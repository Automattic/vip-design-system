/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { baseControlBorderStyle as borderStyle } from '../Form/Input.styles';

interface FormSelectArrowProps {
	iconSize?: number;
	separator?: boolean;
}

export const FormSelectArrow = React.forwardRef< SVGSVGElement, FormSelectArrowProps >(
	( { iconSize = 24, separator = true, ...props }, forwardRef ) => {
		const arrowStyles: ThemeUIStyleObject = {
			position: 'absolute',
			right: 2,
			top: '50%',
			transform: 'translateY(-50%)',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			svg: {
				fill: borderStyle.borderColor,
			},
			...( separator && {
				paddingLeft: 2,
				borderLeftWidth: borderStyle.borderWidth,
				borderLeftStyle: borderStyle.borderStyle,
				borderLeftColor: borderStyle.borderColor,
			} ),
		};

		return (
			<div ref={ forwardRef as React.RefObject< HTMLDivElement > }>
				<MdExpandMore aria-hidden="true" size={ iconSize } sx={ arrowStyles } { ...props } />
			</div>
		);
	}
);

FormSelectArrow.displayName = 'FormSelectArrow';
