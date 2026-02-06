/** @jsxImportSource theme-ui */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { ReactElement, ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { NewTooltipArrow } from './NewTooltipArrow';
import { NewTooltipContent } from './NewTooltipContent';

export interface NewTooltipProps {
	content: ReactNode;
	children: ReactElement;
	position?: 'top' | 'bottom' | 'left' | 'right';
	arrow?: boolean;
	sideOffset?: number;
	sx?: ThemeUIStyleObject;
	className?: string;
	open?: boolean;
	onOpenChange?: ( open: boolean ) => void;
	delayDuration?: number;
}

export const NewTooltip: React.FC< NewTooltipProps > = ( {
	content,
	children,
	position = 'top',
	arrow = false,
	sideOffset,
	sx,
	className,
	open,
	onOpenChange,
	delayDuration = 300,
} ) => {
	const defaultOffset = arrow ? 8 : 4;
	const resolvedOffset = sideOffset ?? defaultOffset;

	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root
				open={ open }
				onOpenChange={ onOpenChange }
				delayDuration={ delayDuration }
			>
				<TooltipPrimitive.Trigger asChild>{ children }</TooltipPrimitive.Trigger>

				<TooltipPrimitive.Portal>
					<NewTooltipContent
						side={ position }
						sideOffset={ resolvedOffset }
						sx={ sx }
						className={ className }
					>
						{ content }
						{ arrow && <NewTooltipArrow /> }
					</NewTooltipContent>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
};
