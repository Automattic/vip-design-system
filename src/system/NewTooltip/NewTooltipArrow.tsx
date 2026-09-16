/** @jsxImportSource theme-ui */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { arrowStyles } from './styles';

export interface NewTooltipArrowProps extends TooltipPrimitive.TooltipArrowProps {
	/** Theme UI style overrides for the tooltip arrow. */
	sx?: ThemeUIStyleObject;
	/** Forwarded ref to the underlying arrow element. */
	ref?: React.Ref< SVGSVGElement >;
}

/**
 * A directional arrow element rendered inside the NewTooltip.
 */
export const NewTooltipArrow = ( { sx, ref, ...props }: NewTooltipArrowProps ) => (
	<TooltipPrimitive.Arrow ref={ ref } sx={ { ...arrowStyles, ...sx } } { ...props } />
);

NewTooltipArrow.displayName = 'NewTooltipArrow';
