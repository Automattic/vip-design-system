/**
 * External dependencies
 */
import { Flex, Text } from 'theme-ui';
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

const Timeline = ( { time, ...props } ) => (
	<Flex { ...props }>
		<Flex sx={ { flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' } }>
			<VerticalLine />
			<MdWatchLater sx={ { color: 'border' } } size={ 18 }/>
			<VerticalLine />
		</Flex>
		<Flex sx={ { alignItems: 'center', ml: 2 } }>
			<Text as="span" sx={ { color: 'muted' } }>{ time }</Text>
		</Flex>
	</Flex>
);

Timeline.propTypes = {
	time: PropTypes.string,
};

export { Timeline };
