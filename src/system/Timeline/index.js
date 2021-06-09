/** @jsx jsx */
/**
 * External dependencies
 */
import { jsx, Flex, Box } from 'theme-ui';
import { MdAccessTime } from 'react-icons/md';
import PropTypes from 'prop-types';

const VerticalLine = () => {
	return <div
		sx={ {
			borderLeft: '2px solid',
			borderColor: 'modes.dark.heading',
			height: 'calc( 50% - 16px )',
			borderRadius: '2px',
		} }>
	</div>;
};

const Timeline = ( { time, ...props } ) => (
	<Flex { ...props }>
		<Flex sx={ { flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' } }>
			<VerticalLine />
			<MdAccessTime sx={ { color: 'modes.dark.heading' } } size={ 18 }/>
			<VerticalLine />
		</Flex>
		<Flex sx={ { alignItems: 'center', ml: 2 } }>
			<span>{ time }</span>
		</Flex>
	</Flex>
);

Timeline.propTypes = {
	time: PropTypes.string,
};

export { Timeline };