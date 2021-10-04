/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdHelp } from 'react-icons/md';
import * as TTip from "@radix-ui/react-tooltip";

/**
* Internal dependencies
*/
import { Card, Text } from '..';

const BaseTrigger = ( { children } ) => (
	<TTip.Trigger asChild>
		<button
			type="button"
			sx={ {
				background: 'transparent',
				border: 'none',
				display: 'inline-flex',
				outline: 'none',
				p: 0,
				m: 0,
			} }
		>
			{ children }
	</button>
	</TTip.Trigger>
)

const StyledArrow = props => <TTip.Arrow sx={{ fill: 'white' }} { ...props } />

const Tooltip = ( {
	trigger = <MdHelp />,
	text = '',
	width = 200,
	children,
	tooltipProps,
	...props
} ) => {
	return (
		<TTip.Root
			skipDelayDuration={ true }
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
			<BaseTrigger>{ trigger }</BaseTrigger>
			<TTip.Content>
				<Card
					className="tooltip-content"
					sx={ { width: width } }
					{ ...props }
				>
					{ children ? children : <Text sx={ { fontSize: 1 } }>{ text }</Text> }
				</Card>
				<StyledArrow />
			</TTip.Content>
		</TTip.Root>
	);
};

Tooltip.propTypes = {
	trigger: PropTypes.string,
	width: PropTypes.number,
	text: PropTypes.string,
	children: PropTypes.object,
};

export { Tooltip };
