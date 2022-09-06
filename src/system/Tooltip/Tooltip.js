/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdHelp } from 'react-icons/md';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

/**
 * Internal dependencies
 */
import { Card, Text } from '..';

const StyledArrow = props => <TooltipPrimitive.Arrow sx={ { fill: 'white' } } { ...props } />;

const Tooltip = ( {
	trigger = <MdHelp sx={ { fill: 'text' } } />,
	text = '',
	width = 200,
	children,
	tooltipProps,
	...props
} ) => {
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root
				skipDelayDuration={ 700 }
				sx={ {
					display: 'inline-block',
					position: 'relative',
					svg: {
						display: 'block',
					},
					'.tooltip-content': {
						visibility: 'hidden',
					},
					'&:hover': {
						'.tooltip-content': {
							visibility: 'visible',
						},
					},
				} }
				{ ...tooltipProps }
			>
				<TooltipPrimitive.Trigger
					sx={ {
						background: 'transparent',
						border: 'none',
						display: 'inline-flex',
						'&:focus': theme => theme.outline,
						'&:focus-visible': theme => theme.outline,
						p: 0,
						m: 0,
					} }
				>
					{ trigger }

					<TooltipPrimitive.Content>
						<Card className="tooltip-content" sx={ { width, background: 'dialog' } } { ...props }>
							{ children ? children : <Text sx={ { fontSize: 2, color: 'text' } }>{ text }</Text> }
						</Card>
						<StyledArrow />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Trigger>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
};

Tooltip.propTypes = {
	children: PropTypes.object,
	text: PropTypes.string,
	tooltipProps: PropTypes.object,
	trigger: PropTypes.string,
	width: PropTypes.number,
};

export { Tooltip };
