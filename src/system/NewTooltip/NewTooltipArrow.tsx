/** @jsxImportSource theme-ui */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { arrowStyles } from './styles';

export interface NewTooltipArrowProps extends TooltipPrimitive.TooltipArrowProps {
	sx?: ThemeUIStyleObject;
}

export const NewTooltipArrow = React.forwardRef< SVGSVGElement, NewTooltipArrowProps >(
	( { sx, ...props }, ref ) => (
		<TooltipPrimitive.Arrow ref={ ref } sx={ { ...arrowStyles, ...sx } } { ...props } />
	)
);

NewTooltipArrow.displayName = 'NewTooltipArrow';
