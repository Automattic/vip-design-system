/** @jsxImportSource theme-ui */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { contentStyles } from './styles';

export interface NewTooltipContentProps extends TooltipPrimitive.TooltipContentProps {
	sx?: ThemeUIStyleObject;
}

export const NewTooltipContent = React.forwardRef< HTMLDivElement, NewTooltipContentProps >(
	( { sx, className, children, ...props }, ref ) => (
		<TooltipPrimitive.Content
			ref={ ref }
			className={ classNames( 'vip-new-tooltip-content', className ) }
			sx={ { ...contentStyles, ...sx } }
			{ ...props }
		>
			{ children }
		</TooltipPrimitive.Content>
	)
);

NewTooltipContent.displayName = 'NewTooltipContent';
