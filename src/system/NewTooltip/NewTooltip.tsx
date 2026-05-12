/** @jsxImportSource theme-ui */

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { ReactElement, ReactNode } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { NewTooltipArrow } from './NewTooltipArrow';
import { NewTooltipContent } from './NewTooltipContent';

export interface NewTooltipProps {
	/** The content displayed inside the tooltip. */
	content: ReactNode;
	/** The element that triggers the tooltip on hover/focus. */
	children: ReactElement;
	/**
	 * The preferred side of the trigger to render the tooltip.
	 * @default 'top'
	 */
	position?: 'top' | 'bottom' | 'left' | 'right';
	/**
	 * Whether to display a directional arrow on the tooltip.
	 * @default false
	 */
	arrow?: boolean;
	/** Custom offset distance (in pixels) between the trigger and the tooltip. */
	sideOffset?: number;
	/** Theme UI style overrides for the tooltip content. */
	sx?: ThemeUIStyleObject;
	/** Additional CSS class name applied to the tooltip content. */
	className?: string;
	/** Controls the open state of the tooltip when used as a controlled component. */
	open?: boolean;
	/** Callback fired when the tooltip open state changes. */
	onOpenChange?: ( open: boolean ) => void;
	/**
	 * Duration in milliseconds before the tooltip appears on hover.
	 * @default 300
	 */
	delayDuration?: number;
}

/**
 * An accessible tooltip component built on Radix UI.
 * Displays contextual information when hovering or focusing a trigger element.
 */
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
