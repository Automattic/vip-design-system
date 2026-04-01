/**
 * External dependencies
 */
import { PropsWithChildren, ReactElement, cloneElement } from 'react';

import './Tooltip.css';

/**
 * Internal dependencies
 */

/**
 * @deprecated Use `NewTooltip` instead.
 */
export interface TooltipProps {
	/** The text content displayed inside the tooltip. */
	title?: string;
	/** The element that triggers the tooltip on hover. */
	trigger?: ReactElement;
	/**
	 * The position of the tooltip relative to the trigger.
	 * @default 'top'
	 */
	position?: 'top' | 'bottom' | 'left' | 'right';
	/**
	 * Whether to display a directional arrow on the tooltip.
	 * @default false
	 */
	arrow?: boolean;
}

/**
 * A CSS-based tooltip component that displays text on hover.
 * @deprecated Use `NewTooltip` instead.
 */
const Tooltip = ( {
	title,
	trigger,
	children,
	position = 'top',
	arrow = false,
}: PropsWithChildren< TooltipProps > ) => {
	const triggerCloned = trigger
		? cloneElement( trigger, {
				'data-vip-tooltip': title,
				'aria-label': title,
				'data-vip-tooltip-position': position,
				'data-vip-tooltip-arrow': `${ arrow }`,
		  } )
		: null;

	return (
		<>
			{ triggerCloned }
			{ children }
		</>
	);
};

export { Tooltip };
