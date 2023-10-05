/**
 * External dependencies
 */
import { PropsWithChildren, ReactElement, cloneElement } from 'react';
import { Global, css } from '@emotion/react';

/**
 * Internal dependencies
 */

export interface TooltipProps {
	title?: string;
	trigger?: ReactElement;
	position?: 'top' | 'bottom';
}

const Tooltip = ( {
	title,
	trigger,
	children,
	position = 'top',
}: PropsWithChildren< TooltipProps > ) => {
	const triggerCloned = trigger
		? cloneElement( trigger, {
				'data-vip-tooltip': title,
				'data-vip-tooltip-position': position,
		  } )
		: null;

	return (
		<>
			<Global
				styles={ css( `
				[data-vip-tooltip] {
					position: relative;
					cursor: default;
				}

				[data-vip-tooltip]:hover::before {
					content: attr(data-vip-tooltip);
					font-size: 14px;
					text-align: center;
					position: absolute;
					display: block;
					left: 50%;
					min-width: 150px;
					max-width: 200px;
					bottom: calc(100% + 10px);
					transform: translate(-50%);
					animation: vip-component-tooltip-fade-in 300ms ease;
					background: rgba(39, 39, 39, 1);
					border-radius: 4px;
					padding: 10px;
					color: #fff;
					z-index: 1;
				}

				[data-vip-tooltip]:hover::after {
					content: "";
					position: absolute;
					display: block;
					left: 50%;
					width: 0;
					height: 0;
					bottom: calc(100% + 6px);
					margin-left: -3px;
					border: 1px solid black;
					border-color: rgba(39, 39, 39, 1) transparent transparent transparent;
					border-width: 4px 6px 0;
					animation: vip-component-tooltip-fade-in 300ms ease;
					z-index: 1;
				}

				[data-vip-tooltip][data-vip-tooltip-position="bottom"]:hover::before {
					bottom: auto;
					top: calc(100% + 10px);
				}

				[data-vip-tooltip][data-vip-tooltip-position="bottom"]:hover::after {
					bottom: auto;
					top: calc(100% + 6px);
					border-color: transparent transparent rgba(39, 39, 39, 1);
					border-width: 0 6px 4px;
				}

				@keyframes vip-component-tooltip-fade-in {
					from {
						opacity: 0;
				   }
					to {
						opacity: 1;
				   }
				}
				` ) }
			/>

			{ triggerCloned }
			{ children }
		</>
	);
};

export { Tooltip };
