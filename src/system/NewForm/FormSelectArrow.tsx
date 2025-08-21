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
}

const arrowStyles: ThemeUIStyleObject = {
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
};

export const FormSelectArrow = React.forwardRef< SVGSVGElement, FormSelectArrowProps >(
	( { iconSize = 24, ...props }, forwardRef ) => (
		<div ref={ forwardRef as React.RefObject< HTMLDivElement > }>
			<MdExpandMore aria-hidden="true" size={ iconSize } sx={ arrowStyles } { ...props } />
		</div>
	)
);

FormSelectArrow.displayName = 'FormSelectArrow';
