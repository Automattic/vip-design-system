/**
 * External dependencies
 */
import { PropsWithChildren, ReactElement, cloneElement } from 'react';

import css from './Tooltip.css';

/**
 * Internal dependencies
 */

/**
 * @deprecated Use `NewTooltip` instead.
 */
export interface TooltipProps {
	title?: string;
	trigger?: ReactElement;
	position?: 'top' | 'bottom' | 'left' | 'right';
	arrow?: boolean;
}

/**
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

export { Tooltip, css };
