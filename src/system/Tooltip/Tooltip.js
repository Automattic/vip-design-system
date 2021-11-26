/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdHelp } from 'react-icons/md';
import * as TTip from '@radix-ui/react-tooltip';

/**
* Internal dependencies
*/
import { Card, Text } from '..';

const StyledArrow = props => <TTip.Arrow sx={{ fill: 'white' }} { ...props } />;

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
			<TTip.Trigger
				sx={ {
					background: 'transparent',
					border: 'none',
					display: 'inline-flex',
					outline: 'none',
					p: 0,
					m: 0,
				} }
			>
				{ trigger }

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
			</TTip.Trigger>
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
