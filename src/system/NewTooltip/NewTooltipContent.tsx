/** @jsxImportSource theme-ui */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import React from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { contentStyles } from './styles';

export interface NewTooltipContentProps extends TooltipPrimitive.TooltipContentProps {
	/** Theme UI style overrides for the tooltip content container. */
	sx?: ThemeUIStyleObject;
	/** Forwarded ref to the underlying content element. */
	ref?: React.Ref< HTMLDivElement >;
}

/**
 * The styled content container for the NewTooltip component.
 */
export const NewTooltipContent = ( {
	sx,
	className,
	children,
	ref,
	...props
}: NewTooltipContentProps ) => (
	<TooltipPrimitive.Content
		ref={ ref }
		className={ classNames( 'vip-new-tooltip-content', className ) }
		sx={ { ...contentStyles, ...sx } }
		{ ...props }
	>
		{ children }
	</TooltipPrimitive.Content>
);

NewTooltipContent.displayName = 'NewTooltipContent';
