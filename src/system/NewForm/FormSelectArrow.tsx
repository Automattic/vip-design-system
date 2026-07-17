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
	className?: string;
	ref?: React.Ref< HTMLDivElement >;
}

export const FormSelectArrow = ( {
	iconSize = 24,
	separator = true,
	ref,
	...props
}: FormSelectArrowProps ) => {
	const arrowStyles: ThemeUIStyleObject = {
		position: 'absolute',
		right: 3,
		top: '7px',
		pointerEvents: 'none',
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
		<div ref={ ref }>
			<MdExpandMore aria-hidden="true" size={ iconSize } sx={ arrowStyles } { ...props } />
		</div>
	);
};

FormSelectArrow.displayName = 'FormSelectArrow';
