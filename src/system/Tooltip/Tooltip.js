/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { MdHelp } from 'react-icons/md';
import { useCallback, useState } from 'react';

/**
 * Internal dependencies
 */
import { Box, Card, Text } from '..';

const Tooltip = ( { trigger = <MdHelp />, text = '', width = 200, children, ...props } ) => {
	const [ position, setPosition ] = useState( { left: 0, top: '100%' } );

	const contentRef = useCallback( node => {
		if ( node !== null ) {
			const outerX = window.innerWidth;
			const outerY = window.innerHeight;
			const bounds = node.getBoundingClientRect();
			console.log( 'bounds:', bounds );
			setPosition( {
				left: bounds.x + bounds.width > outerX ? -bounds.width : 0,
				top: bounds.y + bounds.height > outerY ? -bounds.height : '100%',
			} );
		}
	}, [] );

	return (
		<Box
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
		>
			<Box>{ trigger }</Box>
			<Card
				ref={ contentRef }
				className="tooltip-content"
				sx={ {
					position: 'absolute',
					zIndex: 100,
					left: position.left,
					top: position.top,
					width: width,
				} }
				{ ...props }
			>
				{ children ? children : <Text sx={ { fontSize: 1 } }>{ text }</Text> }
			</Card>
		</Box>
	);
};

Tooltip.propTypes = {
	trigger: PropTypes.string,
	width: PropTypes.number,
	text: PropTypes.string,
	children: PropTypes.object,
};

export { Tooltip };
