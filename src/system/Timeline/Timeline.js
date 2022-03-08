/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import { Flex } from 'theme-ui';
import { MdWatchLater } from 'react-icons/md';
import PropTypes from 'prop-types';

const VerticalLine = () => {
	return (
		<div
			sx={ {
				borderLeft: '2px solid',
				borderColor: 'border',
				height: 'calc( 50% - 16px )',
				borderRadius: '2px',
			} }>
		</div>
	);
};

const Timeline = ( { time, first = false, last = false, ...props } ) => (
	<Flex { ...props }>
		<Flex sx={ { flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' } }>
			{ ! first && (
				<VerticalLine />
			) }
			<MdWatchLater sx={ { color: 'border' } } size={ 18 }/>
			{ ! last && (
				<VerticalLine />
			) }
		</Flex>
		<Flex sx={ { alignItems: 'center', ml: 2 } }>
			{ time }
		</Flex>
	</Flex>
);

Timeline.propTypes = {
	first: PropTypes.bool,
	time: PropTypes.node,
	last: PropTypes.bool,
};

export { Timeline };
